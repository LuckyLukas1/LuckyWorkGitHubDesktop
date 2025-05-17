"use server"

import { requireUser } from "./utils/requireUser";
import {z} from "zod";
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";
import { stripe } from "./utils/stripe";
import { jobListingDurationPricing } from "./utils/jobListingDurationPricing";

const aj = arcjet.withRule(
    shield({
        mode: "LIVE",
    })
).withRule(
    detectBot({
        mode: "LIVE",
        allow: []
    })
);

export async function createCompany(data: z.infer<typeof companySchema>){
    const session = await requireUser(); 

    const req = await request();

    const decision = await aj.protect(req);

    if(decision.isDenied()){
        throw new Error("Forbidden")
    }

    const validateData = companySchema.parse(data);

    await prisma.user.update({
        where: {
            id: session.id,
        },
        data: {
            onboardingCompleted: true,
            userType: "COMPANY",
            Company: {
                create:{
                    ...validateData,
                },
            },
        },
    });
    return redirect("/");
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
    const user = await requireUser();

    const req = await request();

    const decision = await aj.protect(req);

    if(decision.isDenied()){
        throw new Error("Forbidden")
    }

    const validateData = jobSeekerSchema.parse(data);

    await prisma.user.update({
        where: {
            id: user.id as string
        },
        data: {
            onboardingCompleted: true,
            userType: "JOB_SEEKER",
            JobSeeker: {
                create: {
                    ...validateData,
                },
            },
        },
    });

    return redirect("/");
}

export async function createJob(data: z.infer<typeof jobSchema>) {
    const user = await requireUser();
    
    const req = await request();

    const decision = await aj.protect(req);

    if(decision.isDenied()) {
        throw new Error("Förbjuden/Forbidden");
    }
    
    const validateData = jobSchema.parse(data);

    const company = await prisma.company.findUnique({
        where: {
        userId: user.id,
        },
        select: {
            id: true,
            user: {
                select: {
                    stripeCustomerId: true,
                },
            },
        },
    });

    if(!company?.id){
        return redirect("/");
    }

    let stripeCustomerId = company.user.stripeCustomerId;
    

    if(!stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: user.email as string,
            name: user.name as string,
        });

        stripeCustomerId = customer.id;

        //update user with stripe customer id

        await prisma.user.update({
            where: {
                 id: user.id,
             },
            data: {
                 stripeCustomerId: customer.id,
             },
        });
    }

    await prisma.jobPost.create({
        data: {
            jobDescription: validateData.jobDescription,
            jobTitle: validateData.jobTitle,
            employmentType: validateData.employmentType,
            location: validateData.location,
            salaryFrom: validateData.salaryFrom,
            salaryTo: validateData.salaryTo,
            listingDuration: validateData.listingDuration,
            benefits: validateData.benefits,
            companyId: company.id
        },
    });

    const pricingTier = jobListingDurationPricing.find(
        (tier) => tier.days === validateData.listingDuration
    );

    if(!pricingTier) {
        throw new Error("Ogiltig listnings varaktighet vald/Invalid listing duration selected")
    }

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: `Job Posting - ${pricingTier.days} Days`,
                        description: pricingTier.description,
                        images: [
                            "https://m097qqkacv.ufs.sh/f/hShiRruQdjUkMTTH2Vu0brN4JK9u8SYHypP7GE1BIDexfFaZ",
                        ],
                    },
                    currency: "SEK",
                    unit_amount: pricingTier.price * 100,
                },
                quantity: 1,
            },
        ],

        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
    });

    return redirect(session.url as string);
}