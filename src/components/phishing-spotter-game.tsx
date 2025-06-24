
"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { phishingGameMessages } from "@/lib/game-data";
import { Award, CheckCircle, RotateCw, ShieldAlert, ShieldCheck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type GameState = 'playing' | 'feedback' | 'finished';

export function PhishingSpotterGame() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([...phishingGameMessages]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Shuffle messages on client-side mount to avoid hydration mismatch
  useEffect(() => {
    setMessages((prevMessages) => [...prevMessages].sort(() => Math.random() - 0.5));
  }, []);

  const currentMessage = messages[currentIndex];

  const handleAnswer = (userAnswer: boolean) => {
    if (gameState !== 'playing') return;

    const correct = userAnswer === currentMessage.isPhishing;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
    setGameState('feedback');
  };

  const handleNext = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setGameState('playing');
      setIsCorrect(null);
    } else {
      setGameState('finished');
    }
  };

  const restartGame = () => {
    setMessages([...phishingGameMessages].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setScore(0);
    setGameState('playing');
    setIsCorrect(null);
  };
  
  if (gameState === 'finished') {
    const percentage = Math.round((score / messages.length) * 100);
    const feedbackKey = percentage > 60 ? "game.result.feedback_good" : "game.result.feedback_bad";

    return (
      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{t('game.result.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Award className="mx-auto h-20 w-20 text-yellow-500" />
          <p className="text-xl font-medium">
            {t('game.score')}: {score} / {messages.length} ({percentage}%)
          </p>
          <p className="text-lg text-primary">{t(feedbackKey)}</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={restartGame}>
            <RotateCw className="mr-2 h-4 w-4" />
            {t('game.button.play_again')}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle>{t('game.phishing_spotter.title')}</CardTitle>
          <div className="text-sm font-bold">
            <span>{t('game.score')}: {score}</span>
            <span className="text-muted-foreground mx-2">|</span>
            <span>{t('game.message_of', { current: currentIndex + 1, total: messages.length })}</span>
          </div>
        </div>
        <CardDescription>{t('game.phishing_spotter.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="bg-muted p-4 min-h-[120px]">
          <p className="text-sm whitespace-pre-wrap font-mono">{currentMessage.content}</p>
        </Card>
        
        {gameState === 'feedback' && (
           <div className={cn(
               "mt-4 p-4 rounded-lg border",
               isCorrect ? "bg-success/10 border-success/20 text-success" : "bg-destructive/10 border-destructive/20 text-destructive"
            )}>
              <div className="flex items-center gap-2 font-bold">
                 {isCorrect ? <CheckCircle /> : <XCircle />}
                 {isCorrect ? t('game.feedback.correct') : t('game.feedback.incorrect')}
              </div>
            <p className="mt-2 text-sm text-foreground/80">{t(currentMessage.explanationKey)}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
        {gameState === 'playing' ? (
          <>
            <Button onClick={() => handleAnswer(false)} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
              <ShieldCheck className="mr-2" /> {t('game.button.safe')}
            </Button>
            <Button onClick={() => handleAnswer(true)} className="w-full sm:w-auto" variant="destructive">
              <ShieldAlert className="mr-2" /> {t('game.button.phishing')}
            </Button>
          </>
        ) : (
          <Button onClick={handleNext} className="w-full sm:w-auto">
            {t('game.button.next')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
