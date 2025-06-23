
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { safetyTips } from "@/lib/tips";

export function SafetyTipCarousel() {
  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % safetyTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + safetyTips.length) % safetyTips.length);
  };
  
  useEffect(() => {
    const timer = setInterval(nextTip, 7000);
    return () => clearInterval(timer);
  }, []);

  const { title, tip } = safetyTips[currentTip];

  return (
    <Card className="shadow-lg bg-gradient-to-br from-card to-muted/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-yellow-400" />
          <span>Quick Safety Tip</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <p className="text-muted-foreground min-h-[60px]">{tip}</p>
        <div className="flex justify-center items-center gap-4">
          <Button variant="outline" size="icon" onClick={prevTip} aria-label="Previous tip">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {safetyTips.map((_, index) => (
                <span key={index} className={`h-2 w-2 rounded-full transition-colors ${currentTip === index ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={nextTip} aria-label="Next tip">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
