'use server';
/**
 * @fileOverview An AI flow to generate cybercrime statistics.
 *
 * - getCyberStats - A function that fetches generated cybercrime statistics.
 * - CyberStatsOutput - The return type for the getCyberStats function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CrimeTypeStatSchema = z.object({
  type: z.string().describe('The type of cybercrime (e.g., Phishing, OTP Fraud).'),
  cases: z.number().describe('The number of reported cases for this crime type.'),
});

const YearlyTrendStatSchema = z.object({
  year: z.string().describe('The year for the data point (e.g., "2022", "2023").'),
  reportedCases: z.number().describe('The total number of reported cases in that year.'),
});

const CyberStatsOutputSchema = z.object({
  crimeTypes: z.array(CrimeTypeStatSchema).describe('A list of the top 5 most common cybercrime types and their case numbers.'),
  yearlyTrends: z.array(YearlyTrendStatSchema).describe('A list of reported cybercrime cases over the last 3-4 years to show a trend.'),
});
export type CyberStatsOutput = z.infer<typeof CyberStatsOutputSchema>;

export async function getCyberStats(): Promise<CyberStatsOutput> {
  return cyberStatsFlow();
}

const prompt = ai.definePrompt({
  name: 'cyberStatsPrompt',
  output: {schema: CyberStatsOutputSchema},
  prompt: `You are a cybersecurity data analyst AI. Your task is to generate a realistic but fictional dataset about cybercrime trends in India.

  The data should be presented in a way that is suitable for creating charts.
  - For 'crimeTypes', generate the top 5 most common cybercrime types in India.
  - For 'yearlyTrends', generate data for the last 4 years to show a clear trend in reported cases. The numbers should show a general increase over the years.

  IMPORTANT: You must respond with a valid JSON object that strictly adheres to the output schema. Do not add any text, comments, or markdown formatting outside of the JSON structure.
  `,
   config: {
    temperature: 0.5,
  }
});

const cyberStatsFlow = ai.defineFlow(
  {
    name: 'cyberStatsFlow',
    outputSchema: CyberStatsOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    
    if (!output || !output.crimeTypes || !output.yearlyTrends) {
        throw new Error("The AI model failed to return valid statistical data.");
    }
    
    return output;
  }
);
