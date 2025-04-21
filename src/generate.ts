// src/generate.ts
import dotenv from 'dotenv';
import fs from 'fs';
import { OpenAI } from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources';
import { buildPrompt } from './promptTemplates';
import { MarketingInput } from './types';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const product: MarketingInput = {
  userLevel: 'intermediate',
  outputTarget: 'instagram',
  imageStyle: 'clickable',
  productInfo: `Chanel 향수/ No.5 EDP / 100ml / ₩202,000`,
  imageUrls: [
    'https://img.danawa.com/prod_img/large/group_963/481882_1.jpg?_v=20230524102808',
  ],
};

async function main() {
  const basePrompt = buildPrompt(product);
  const imageContext =
    product.imageUrls && product.imageUrls.length > 0
      ? `\n\n<Reference Images>\n${product.imageUrls.join('\n')}`
      : '';

  const context = `${basePrompt}${imageContext}`;
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `
  You are a marketing content generator AI for Korean users.
  
  Your task is to:
  1. Generate persuasive Korean advertising copy for Instagram (with hashtags).
  2. Create an English image generation prompt for a DALL·E-like model.
  
  Important:
  - Ensure any reference image (brand asset) remains clearly visible (e.g., logo must not be removed or obscured).
  - The final image prompt should include a visual rendering of the advertising copy within the image (as an overlay or caption).
  - The advertising copy must be catchy, culturally fitting, and appropriate for Korean audiences.
  
  Always respond in the following JSON format.`,
    },
    {
      role: 'user',
      content: `
      Generate:
      1. A Korean advertising copy (20-30 characters max, with hashtags) for Instagram post.
      2. An English image prompt that:
         - Visually reflects the product and vibe.
         - Uses the reference image *as-is* without any alteration.
         - Clearly shows the main product and its key visual features.
         - Embeds the Korean ad copy text naturally in the image (center or bottom).
         - The product and logo must remain unedited and highly visible.
      
      Return JSON only with this structure:
      \`\`\`json
      {
        "advertising_copy": "...",
        "image_prompt": "..."
      }
      \`\`\`
      
      --- INPUT CONTEXT ---
      ${context}
      `.trim(),
    },
  ];

  const candidates: {
    advertising_copy: string;
    image_prompt: string;
    imageUrl?: string;
  }[] = [];
  for (let i = 0; i < 3; i++) {
    console.log(`🔁 Generating candidate ${i + 1}...`);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.9,
    });

    const raw = response.choices[0].message?.content || '';
    console.log(` Raw [${i + 1}]:\n`, raw);

    try {
      const jsonText = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(jsonText);
      candidates.push({
        advertising_copy: parsed.advertising_copy,
        image_prompt: parsed.image_prompt,
      });
    } catch (err) {
      console.error(err);
      candidates.push({
        advertising_copy: 'JSON parse failed',
        image_prompt: raw,
      });
    }
  }

  fs.writeFileSync('output.json', JSON.stringify(candidates, null, 2));
  console.log('end');
}

main().catch(console.error);
