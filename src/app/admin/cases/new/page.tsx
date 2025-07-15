
import { CaseForm } from "../_components/case-form";

export default function NewCasePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Add New Solved Case</h1>
                <p className="text-muted-foreground">Fill in the details for the new case below.</p>
            </div>
            <CaseForm />
        </div>
    )
}
