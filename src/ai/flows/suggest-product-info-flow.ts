
'use server';
/**
 * @fileOverview An AI flow to suggest product information for new listings.
 *
 * - suggestProductInfo - A function that generates a product description and price.
 * - SuggestProductInfoInput - The input type for the flow.
 * - SuggestProductInfoOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SuggestProductInfoInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestProductInfoInput = z.infer<typeof SuggestProductInfoInputSchema>;

const SuggestProductInfoOutputSchema = z.object({
  description: z.string().describe('A creative and compelling product description, optimized for marketplace listings. It should be around 2-3 sentences long.'),
  suggestedPrice: z.number().describe('A suggested starting price for the product in USD, based on the product name and image.'),
});
export type SuggestProductInfoOutput = z.infer<typeof SuggestProductInfoOutputSchema>;

export async function suggestProductInfo(input: SuggestProductInfoInput): Promise<SuggestProductInfoOutput> {
  return suggestProductInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProductInfoPrompt',
  input: { schema: SuggestProductInfoInputSchema },
  output: { schema: SuggestProductInfoOutputSchema },
  prompt: `You are an expert in e-commerce marketing. Based on the product name and image provided, generate a compelling product description and a reasonable suggested starting price in USD.

The description should be exciting and highlight key features that would appeal to customers on a B2B marketplace.
The price should be a simple number, without any currency symbols.

Product Name: {{{productName}}}
Product Image: {{media url=photoDataUri}}`,
});

const suggestProductInfoFlow = ai.defineFlow(
  {
    name: 'suggestProductInfoFlow',
    inputSchema: SuggestProductInfoInputSchema,
    outputSchema: SuggestProductInfoOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
