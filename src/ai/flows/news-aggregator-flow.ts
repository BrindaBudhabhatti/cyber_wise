'use server';
/**
 * @fileOverview An AI-powered news aggregator for the cyber world.
 *
 * - getCyberNews - A function that fetches cyber news articles.
 * - CyberNewsInput - The input type for the getCyberNews function.
 * - CyberNewsOutput - The return type for the getCyberNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const CyberNewsInputSchema = z.object({
  category: z.enum(['Local', 'Global']).describe("The category of news to fetch. 'Local' focuses on India, 'Global' on worldwide news."),
});
export type CyberNewsInput = z.infer<typeof CyberNewsInputSchema>;

export const NewsArticleSchema = z.object({
    title: z.string().describe('The headline of the news article.'),
    summary: z.string().describe('A brief summary of the news article.'),
    source: z.string().describe('The name of the news source (e.g., "The Hacker News", "Times of India").'),
    url: z.string().url().describe('A placeholder URL to the full article.'),
    publishedDate: z.string().describe('The publication date of the article, in a friendly format (e.g., "June 24, 2024").'),
});
export type NewsArticle = z.infer<typeof NewsArticleSchema>;

export const CyberNewsOutputSchema = z.object({
    articles: z.array(NewsArticleSchema).describe("A list of 5 generated news articles.")
});
export type CyberNewsOutput = z.infer<typeof CyberNewsOutputSchema>;

export async function getCyberNews(input: CyberNewsInput): Promise<CyberNewsOutput> {
  return newsAggregatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'newsAggregatorPrompt',
  input: {schema: CyberNewsInputSchema},
  output: {schema: CyberNewsOutputSchema},
  prompt: `You are a news aggregator AI specializing in cybersecurity and cybercrime. Your task is to generate a list of 5 recent and relevant news articles based on the specified category.

  The information should be current and reflect the types of stories found on cybersecurity news websites like 'the420.in'.

  - If the category is 'Local', the news must be specific to India.
  - If the category is 'Global', the news should cover significant international cyber events.

  For each article, provide a concise title, a brief summary (2-3 sentences), a plausible news source, a placeholder URL (e.g., https://example.com/news-story), and a recent-looking publication date.

  Category: {{{category}}}
  `,
});

const newsAggregatorFlow = ai.defineFlow(
  {
    name: 'newsAggregatorFlow',
    inputSchema: CyberNewsInputSchema,
    outputSchema: CyberNewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
