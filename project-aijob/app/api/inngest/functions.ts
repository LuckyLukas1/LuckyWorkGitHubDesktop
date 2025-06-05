import { prisma } from "@/app/utils/db";
import { inngest } from "@/app/utils/inngest/client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const handleJobExpiration = inngest.createFunction(
    {id: 'job-expiration'}, 
    {event: 'job/created'},
    async ({event, step}) => {
        const {jobId, expirationDays} = event.data;

        await step.sleep('wait-for-expiration', `${expirationDays}d`);

        await step.run('updatejob-status', async () => {
            await prisma.jobPost.update({
                where: {
                    id: jobId,
                },
                data: {
                    status: "EXPIRED",
                },
            });
        });

        return {jobId, message: "Job marked as expired"};
    } 
);

export const sendPeriodicJobListings = inngest.createFunction(
    {id: "send-job-listings"},
    {event: "jobseeker/created"},
    async ({event, step}) => {
        const {userId, email} = event.data;

        const totalDays = 30;
        const intervalDays = 7;
        let currentDay = 0;

        while(currentDay < totalDays){
            await step.sleep("wait-interval", `${intervalDays}d`)
        }
    }
)