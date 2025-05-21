import { JobFilter } from "@/components/general/JobFilters";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />
      <Card className="col-span-2"></Card>
    </div>
  );
}
