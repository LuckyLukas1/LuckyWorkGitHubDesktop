import { Ban } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">Hittade inga jobb</h2>
      <p>Prova med en annan filtrering</p>
    </div>
  );
}
