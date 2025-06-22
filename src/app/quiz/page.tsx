import { CyberQuiz } from "@/components/cyber-quiz";

export default function QuizPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold">Cyber Safety Quiz</h1>
        <p className="text-muted-foreground">
          Test your knowledge and see how cyber-aware you are!
        </p>
      </div>
      <CyberQuiz />
    </div>
  );
}
