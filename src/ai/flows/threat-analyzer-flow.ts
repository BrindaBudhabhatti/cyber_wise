
'use server';
/**
 * @fileOverview An AI-powered threat analyzer for suspicious messages and links.
 *
 * - analyzeThreat - A function that handles the threat analysis process.
 * - ThreatAnalyzerInput - The input type for the analyzeThreat function.
 * - ThreatAnalyzerOutput - The return type for the analyzeThreat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThreatAnalyzerInputSchema = z.object({
  content: z.string().describe('The suspicious message, URL, or content to be analyzed.'),
  type: z.enum(['message', 'link']).describe("The type of content being analyzed."),
});
export type ThreatAnalyzerInput = z.infer<typeof ThreatAnalyzerInputSchema>;

const ThreatAnalyzerOutputSchema = z.object({
  isSuspicious: z.boolean().describe('Whether or not the content is deemed suspicious.'),
  analysis: z.string().describe("A detailed analysis and explanation of the content's potential threats."),
  threatType: z.enum(['Phishing', 'Scam', 'Malware', 'Spam', 'Safe']).describe('The primary category of threat identified.'),
  confidenceScore: z.number().min(0).max(100).describe('A confidence score (0-100) indicating how certain the AI is about its analysis.'),
  redFlags: z.array(z.string()).describe('A list of specific red flags or suspicious elements found in the content.'),
});
export type ThreatAnalyzerOutput = z.infer<typeof ThreatAnalyzerOutputSchema>;

export async function analyzeThreat(input: ThreatAnalyzerInput): Promise<ThreatAnalyzerOutput> {
  return threatAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'threatAnalyzerPrompt',
  input: {schema: ThreatAnalyzerInputSchema},
  output: {schema: ThreatAnalyzerOutputSchema},
  prompt: `You are a cybersecurity expert specializing in detecting online threats like phishing, scams, and malware.
  Analyze the following content based on its type and provide a detailed threat assessment.

  If the type is 'message', analyze the text content for signs of social engineering, suspicious requests, or malicious intent.
  If the type is 'link', analyze the URL structure for signs of phishing, such as misleading domain names, unusual subdomains, or suspicious paths.

  Your analysis should include:
  1.  A clear verdict on whether the content is suspicious.
  2.  The primary type of threat you believe it is (Phishing, Scam, Malware, Spam, or Safe).
  3.  A confidence score from 0-100 for your verdict.
  4.  A list of specific "red flags" you identified (e.g., "Sense of urgency," "Suspicious link," "Grammatical errors," "Request for personal information", "Misleading Domain Name").
  5.  A comprehensive analysis explaining your reasoning in simple terms.

  If the content appears safe, explain why.

  Content Type: {{{type}}}
  Content to analyze:
  """
  {{{content}}}
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
