import { requireUser } from "@/app/utils/requireUser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default async function PaymentSuccess() {
  await requireUser();
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Betalningen lyckades</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
              Grattis, din betalning har genomförts, din jobbannons är nu aktiv!
            </p>

            <Button asChild className="w-full mt-5">
              <Link href="/">Gå tillbaka till startsidan</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
