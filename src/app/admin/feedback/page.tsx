
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, type DocumentData } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

type Feedback = {
  id: string;
  name: string;
  contact?: string;
  feedback: string;
  rating: number;
  createdAt: Date;
};

export default function AdminFeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const feedbackCollection = collection(db, 'feedback');
        const q = query(feedbackCollection, orderBy('createdAt', 'desc'));
        const feedbackSnapshot = await getDocs(q);
        const feedbacks = feedbackSnapshot.docs.map((doc: DocumentData) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            contact: data.contact,
            feedback: data.feedback,
            rating: data.rating,
            createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to JS Date
          };
        });
        setFeedbackList(feedbacks);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to fetch feedback. Make sure you are authenticated and have the correct permissions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`}
          />
        ))}
      </div>
    );
  };
  
  const FeedbackSkeleton = () => (
     <TableBody>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton className="h-4 w-24" /></TableCell>
          <TableCell><Skeleton className="h-4 w-16" /></TableCell>
          <TableCell><Skeleton className="h-4 w-32" /></TableCell>
          <TableCell><Skeleton className="h-4 w-48" /></TableCell>
          <TableCell><Skeleton className="h-4 w-20" /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  )

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold">Feedback Submissions</h1>
        <p className="text-muted-foreground">
          Here you can view all feedback submitted by users.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Feedback</CardTitle>
          <CardDescription>
            Displaying {feedbackList.length} submission(s).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-destructive">{error}</p>}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              {isLoading ? <FeedbackSkeleton /> : (
                 <TableBody>
                  {feedbackList.length > 0 ? (
                    feedbackList.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell className="font-medium">{feedback.name}</TableCell>
                        <TableCell>{renderStars(feedback.rating)}</TableCell>
                        <TableCell>
                          {feedback.contact ? (
                            <Badge variant="secondary">{feedback.contact}</Badge>
                          ) : (
                            <span className="text-muted-foreground/60">Not provided</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{feedback.feedback}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDistanceToNow(feedback.createdAt, { addSuffix: true })}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No feedback submitted yet.
                        </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
