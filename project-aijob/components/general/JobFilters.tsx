import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const jobTypes = ["heltid", "deltid", "kontrakt", "praktikplats"];

export function JobFilter() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Filter</CardTitle>
        <Button variant="destructive" size="sm" className="h-8">
          <span>Rensa allt</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="text-lg font-semibold">Jobbtyp</Label>
          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((job, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={job} />
                <Label className="text-sm font-medium" htmlFor={job}>
                  {job}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
