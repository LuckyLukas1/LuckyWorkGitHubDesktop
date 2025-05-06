import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const companies = [
    {id: 0, name: 'ArcJet', logo: }
]

export default function PostJobPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Hey this is the form</CardTitle>
        </CardHeader>
      </Card>

      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies hiring top talents
            </CardDescription>
          </CardHeader>
          <CardContent>{/* Company logos */}</CardContent>
        </Card>
      </div>
    </div>
  );
}
