
import { getSolvedCase } from "@/lib/data-service";
import { CaseForm } from "../../_components/case-form";
import { notFound } from "next/navigation";

export default async function EditCasePage({ params }: { params: { id: string } }) {
    const caseData = await getSolvedCase(params.id);

    if (!caseData) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Edit Solved Case</h1>
                <p className="text-muted-foreground">Update the case details below.</p>
            </div>
            <CaseForm caseData={caseData} />
        </div>
    )
}
