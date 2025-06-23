
"use client";

import { useState } from "react";
import { quizQuestions } from "@/lib/quiz-data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Award, ShieldX, RotateCw, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type AnswerState = 'correct' | 'incorrect' | 'unanswered';

export function CyberQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;

  const handleSelectAnswer = (answer: string) => {
    if (answerState !== 'unanswered') return;
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) {
       toast({
        title: "No answer selected",
        description: "Please select an option before continuing.",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setAnswerState('unanswered');
    setSelectedAnswer(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswerState('unanswered');
    setShowExplanation(false);
  };

  if (isFinished) {
    const percentage = (score / quizQuestions.length) * 100;
    let feedback = "";
    if (percentage > 80) feedback = "Excellent! You're a true Cyber Guardian!";
    else if (percentage > 50) feedback = "Good job! You have a solid understanding of cyber safety.";
    else feedback = "Don't worry! Every expert was once a beginner. Keep learning!";

    return (
      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Award className="mx-auto h-20 w-20 text-yellow-500" />
          <p className="text-xl font-medium">
            Your Score: {score} / {quizQuestions.length}
          </p>
          <p className="text-lg text-primary">{feedback}</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={restartQuiz}>
            <RotateCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <Progress value={progress} className="mb-4" />
        <CardTitle>
          Question {currentQuestionIndex + 1}/{quizQuestions.length}
        </CardTitle>
        <p className="text-lg font-medium pt-2">{currentQuestion.question}</p>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer ?? ""}
          onValueChange={handleSelectAnswer}
          className="space-y-4"
        >
          {currentQuestion.options.map((option) => (
            <Label
              key={option}
              htmlFor={option}
              className={cn(
                "flex items-center gap-4 rounded-lg border p-4 transition-all cursor-pointer hover:bg-accent/50",
                selectedAnswer === option && "bg-accent",
                answerState === 'correct' && selectedAnswer === option && 'border-success bg-success/10 text-success',
                answerState === 'incorrect' && selectedAnswer === option && 'border-destructive bg-destructive/10 text-destructive'
              )}
            >
              <RadioGroupItem value={option} id={option} />
              <span>{option}</span>
            </Label>
          ))}
        </RadioGroup>
        {showExplanation && (
          <div className={cn("mt-4 p-4 rounded-lg", answerState === 'correct' ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>
              <div className="flex items-center gap-2 font-bold">
                 {answerState === 'correct' ? <CheckCircle /> : <XCircle />}
                 {answerState === 'correct' ? "Correct!" : "Incorrect."}
              </div>
            <p className="mt-2 text-sm">{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        {answerState === 'unanswered' ? (
          <Button onClick={checkAnswer}>Submit</Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
