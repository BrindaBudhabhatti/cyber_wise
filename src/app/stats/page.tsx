
'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getCyberStats, type CyberStatsOutput } from '@/ai/flows/cyber-stats-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  primary: {
    color: 'hsl(var(--primary))',
  },
  cases: {
    label: 'Cases',
    color: 'hsl(var(--primary))',
  },
  reportedCases: {
    label: 'Reported Cases',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function StatsPage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<CyberStatsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const result = await getCyberStats();
        setStats(result);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        toast({
          title: t('stats_page.error_title'),
          description: t('stats_page.error_description'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [t, toast]);

  const StatsSkeleton = () => (
    <div className="grid md:grid-cols-2 gap-6">
       <Card>
          <CardHeader>
             <Skeleton className="h-6 w-3/4" />
             <Skeleton className="h-4 w-1/2" />
          </CardHeader>
           <CardContent>
             <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
             <Skeleton className="h-6 w-3/4" />
             <Skeleton className="h-4 w-1/2" />
          </CardHeader>
           <CardContent>
             <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('stats_page.title')}</h1>
        <p className="text-muted-foreground">{t('stats_page.description')}</p>
      </div>

      {isLoading ? <StatsSkeleton /> : stats && (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
           <Card>
                <CardHeader>
                    <CardTitle>{t('stats_page.crime_types_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart data={stats.crimeTypes} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="type" tickLine={false} axisLine={false} tickMargin={8} angle={-30} textAnchor="end" height={60} />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="cases" fill="var(--color-primary)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

           <Card>
                <CardHeader>
                    <CardTitle>{t('stats_page.trends_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <LineChart data={stats.yearlyTrends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="reportedCases" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
