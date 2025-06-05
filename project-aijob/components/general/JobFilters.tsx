import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countryList } from "@/app/utils/countriesList";

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

      <Separator className="mb-4" />

      <CardContent className="space-y-6">
        <div className="space-y-2">
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

        <Separator />

        <div className="space-y-2">
          <Label className="text-lg font-semibold">Plats</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Välj plats" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Världen runt</SelectLabel>
                    <SelectItem value="worldwide">
                      <span>🌍</span>
                      <span className="pl-2">Världen runt / Distans</span>
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Plats</SelectLabel>
                    {countryList.map((country) => (
                      <SelectItem value={country.name} key={country.code}>
                        <span>{country.flagEmoji}</span>
                        <span className="pl-2">{country.name}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
