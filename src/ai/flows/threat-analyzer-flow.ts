'use server';
/**
 * @fileOverview An AI-powered threat analyzer for suspicious messages.
 *
 * - analyzeThreat - A function that handles the threat analysis process.
 * - ThreatAnalyzerInput - The input type for the analyzeThreat function.
 * - ThreatAnalyzerOutput - The return type for the analyzeThreat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThreatAnalyzerInputSchema = z.object({
  message: z.string().describe('The suspicious message (email, SMS, etc.) to be analyzed.'),
});
export type ThreatAnalyzerInput = z.infer<typeof ThreatAnalyzerInputSchema>;

const ThreatAnalyzerOutputSchema = z.object({
  isSuspicious: z.boolean().describe('Whether or not the message is deemed suspicious.'),
  analysis: z.string().describe("A detailed analysis and explanation of the message's potential threats."),
  threatType: z.enum(['Phishing', 'Scam', 'Malware', 'Spam', 'Safe']).describe('The primary category of threat identified.'),
  confidenceScore: z.number().min(0).max(100).describe('A confidence score (0-100) indicating how certain the AI is about its analysis.'),
  redFlags: z.array(z.string()).describe('A list of specific red flags or suspicious elements found in the message.'),
});
export type ThreatAnalyzerOutput = z.infer<typeof ThreatAnalyzerOutputSchema>;

export async function analyzeThreat(input: ThreatAnalyzerInput): Promise<ThreatAnalyzerOutput> {
  return threatAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'threatAnalyzerPrompt',
  input: {schema: ThreatAnalyzerInputSchema},
  output: {schema: ThreatAnalyzerOutputSchema},
  prompt: `You are a cybersecurity expert specializing in detecting online threats like phishing, scams, and malware from text-based messages.
  Analyze the following message and provide a detailed threat assessment.

  Your analysis should include:
  1.  A clear verdict on whether the message is suspicious.
  2.  The primary type of threat you believe it is (Phishing, Scam, Malware, Spam, or Safe).
  3.  A confidence score from 0-100 for your verdict.
  4.  A list of specific "red flags" you identified (e.g., "Sense of urgency," "Suspicious link," "Grammatical errors," "Request for personal information").
  5.  A comprehensive analysis explaining your reasoning in simple terms.

  If the message appears safe, explain why.

  Message to analyze:
  """
  {{{message}}}
  """`,
});

const threatAnalyzerFlow = ai.defineFlow(
  {
    name: 'threatAnalyzerFlow',
    inputSchema: ThreatAnalyzerInputSchema,
    outputSchema: ThreatAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
