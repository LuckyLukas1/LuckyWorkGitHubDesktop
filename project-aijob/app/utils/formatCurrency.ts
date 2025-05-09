import { Currency } from "lucide-react";

export function formatCurrency(amount: number){
    return new Intl.NumberFormat('sv-se', {style: "currency", currency: "SEK", maximumFractionDigits: 0}).format(amount);
}