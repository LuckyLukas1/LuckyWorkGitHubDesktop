
interface iAppProps {
    days: number;
    price: number;
    description: string;
}

export const jobListingDurationPricing: iAppProps[] = [
    {
        days: 30,
        price: 99,
        description: "Standard synlighet"
    },
    {
        days: 60,
        price: 179,
        description: "Utökad synlighet"
    },
     {
        days: 90,
        price: 249,
        description: "Maximal exponering"
    }
]