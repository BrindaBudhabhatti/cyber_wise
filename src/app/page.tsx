import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SafetyTipCarousel } from '@/components/safety-tip-carousel';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Welcome to CyberWise
        </h1>
        <p className="text-muted-foreground md:text-lg">
          Your friendly guide to navigating the digital world safely.
        </p>
      </div>

      <SafetyTipCarousel />

      <Card className="w-full shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="text-primary" />
            <span>Meet Your CyberBuddy</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Have questions about cybercrime, online safety, or Indian cyber
            laws? Our AI-powered chatbot, CyberBuddy, is here to help you with
            instant and reliable answers.
          </p>
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link href="/chat">
              Chat with CyberBuddy
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
