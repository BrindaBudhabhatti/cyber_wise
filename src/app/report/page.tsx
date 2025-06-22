import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone, Globe } from "lucide-react";

export default function ReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">How to Report a Cybercrime</h1>
        <p className="text-muted-foreground">
          Follow these steps to report an incident and find emergency contacts.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Steps to File a Complaint</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Step 1: Gather Evidence</AccordionTrigger>
              <AccordionContent>
                Collect all relevant evidence such as screenshots of messages,
                URLs of fake websites, transaction details, or any other digital
                proof. Do not delete or alter the evidence.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Step 2: Visit the National Cyber Crime Reporting Portal
              </AccordionTrigger>
              <AccordionContent>
                Go to the official government portal at{" "}
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  cybercrime.gov.in
                </a>
                . This is the primary platform for reporting cybercrimes in
                India.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Step 3: File a Complaint
              </AccordionTrigger>
              <AccordionContent>
                On the portal, choose the appropriate category for the crime.
                Fill in the complaint form with accurate details about the
                incident and upload the evidence you have collected.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>
                Step 4: Note Down Your Complaint ID
              </AccordionTrigger>
              <AccordionContent>
                After submitting the complaint, you will receive a unique
                complaint ID. Keep this number safe for future reference and for
                tracking the status of your complaint.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Step 5: Contact Your Local Police (Optional but Recommended)
              </AccordionTrigger>
              <AccordionContent>
                For serious crimes, it is also advisable to file a complaint at your nearest police station with a copy of your online complaint.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Card className="border-destructive bg-destructive/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle /> Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-destructive" />
            <div>
              <p className="font-semibold">
                National Cyber Crime Helpline Number
              </p>
              <p className="text-muted-foreground">1930</p>
            </div>
          </div>
           <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-destructive" />
            <div>
              <p className="font-semibold">Official Reporting Portal</p>
              <p className="text-muted-foreground">
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  https://cybercrime.gov.in
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
