// 'use server'
'use server';

/**
 * @fileOverview This file defines the Genkit flow for the CyberBuddy chatbot interaction.
 *
 * It allows users to ask questions about cybercrime, laws, penalties, and tips, providing immediate and helpful information.
 * - cyberBuddyChatbot - A function that handles the chatbot interaction.
 * - CyberBuddyChatbotInput - The input type for the cyberBuddyChatbot function.
 * - CyberBuddyChatbotOutput - The return type for the cyberBuddyChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CyberBuddyChatbotInputSchema = z.object({
  query: z.string().describe('The user query about cybercrime, laws, penalties, or tips.'),
  language: z.string().describe('The language for the chatbot to respond in (e.g., "en", "hi", "gu").'),
});
export type CyberBuddyChatbotInput = z.infer<typeof CyberBuddyChatbotInputSchema>;

const CyberBuddyChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type CyberBuddyChatbotOutput = z.infer<typeof CyberBuddyChatbotOutputSchema>;

export async function cyberBuddyChatbot(input: CyberBuddyChatbotInput): Promise<CyberBuddyChatbotOutput> {
  return cyberBuddyChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cyberBuddyChatbotPrompt',
  input: {schema: CyberBuddyChatbotInputSchema},
  output: {schema: CyberBuddyChatbotOutputSchema},
  prompt: `You are CyberBuddy, a helpful chatbot specializing in cybercrime awareness and Indian cyber laws.

  A user will ask a question related to cybercrime, Indian cyber laws, penalties, or safety tips.
  Provide a concise and informative answer based on your knowledge.

  VERY IMPORTANT: You MUST respond in the language specified in the 'language' field.

  Language: {{{language}}}
  User Query: {{{query}}}`,
});

const cyberBuddyChatbotFlow = ai.defineFlow(
  {
    name: 'cyberBuddyChatbotFlow',
    inputSchema: CyberBuddyChatbotInputSchema,
    outputSchema: CyberBuddyChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
