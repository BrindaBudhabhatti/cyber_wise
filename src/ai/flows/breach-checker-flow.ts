
'use server';
/**
 * @fileOverview A flow to check for email breaches using the Have I Been Pwned API.
 * 
 * - checkEmailBreach - Checks an email against the HIBP database.
 * - Breach - The type for a single breach object.
 * - BreachCheckOutput - The return type for the checkEmailBreach function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the schema for a single breach based on HIBP API response
const BreachSchema = z.object({
  Name: z.string(),
  Title: z.string(),
  Domain: z.string(),
  BreachDate: z.string(),
  AddedDate: z.string(),
  ModifiedDate: z.string(),
  PwnCount: z.number(),
  Description: z.string(),
  DataClasses: z.array(z.string()),
  IsVerified: z.boolean(),
  IsFabricated: z.boolean(),
  IsSensitive: z.boolean(),
  IsRetired: z.boolean(),
  IsSpamList: z.boolean(),
  LogoPath: z.string(),
});
export type Breach = z.infer<typeof BreachSchema>;

const BreachCheckInputSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
});

// The output can be an array of breaches, or a specific status
const BreachCheckOutputSchema = z.object({
  status: z.enum(['breached', 'not_breached', 'error', 'key_missing']),
  breaches: z.array(BreachSchema).optional(),
  message: z.string().optional(),
});
export type BreachCheckOutput = z.infer<typeof BreachCheckOutputSchema>;

export async function checkEmailBreach(input: { email: string }): Promise<BreachCheckOutput> {
  return checkEmailBreachFlow(input);
}

const checkEmailBreachFlow = ai.defineFlow(
  {
    name: 'checkEmailBreachFlow',
    inputSchema: BreachCheckInputSchema,
    outputSchema: BreachCheckOutputSchema,
  },
  async ({ email }) => {
    const apiKey = process.env.HIBP_API_KEY;
    if (!apiKey) {
      return {
        status: 'key_missing',
        message: 'The Have I Been Pwned API key is not configured on the server.',
      };
    }

    try {
      const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`, {
        headers: {
          'hibp-api-key': apiKey,
          'user-agent': 'CyberWise-App' // HIBP requires a user-agent
        },
      });

      if (response.status === 200) {
        const breaches = await response.json();
        return {
          status: 'breached',
          breaches: breaches,
        };
      }
      
      if (response.status === 404) {
        return {
          status: 'not_breached',
          message: 'Good news — no breaches found for this email address!',
        };
      }

      // Handle other error codes
      const errorText = await response.text();
      return {
        status: 'error',
        message: `An error occurred while checking for breaches. The API returned status ${response.status}.`,
      };
    } catch (error) {
      console.error("Error calling HIBP API:", error);
      return {
        status: 'error',
        message: 'An unexpected error occurred while contacting the breach analysis service.',
      };
    }
  }
);

    