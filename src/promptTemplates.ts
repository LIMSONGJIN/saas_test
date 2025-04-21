import { MarketingInput } from './types';

export type UserLevel = 'beginner' | 'intermediate' | 'brand_manager';
export type OutputTarget =
  | 'instagram'
  | 'x'
  | 'blog'
  | 'naver_shop'
  | 'youtube';
export type ImageStyle =
  | 'emotional'
  | 'clickable'
  | 'luxury'
  | 'eco'
  | 'moodboard'
  | 'dynamic'
  | 'seasonal'
  | 'cold'
  | 'flyer';

export const strategyTemplates: Record<UserLevel, string> = {
  beginner: `
You are an expert marketer helping small business owners who are just starting out. 
Create simple, friendly, and emotionally resonant marketing phrases that are easy to understand and relate to. 
Focus more on emotional connection, practicality, and Korean-style warmth.
`.trim(),

  intermediate: `
You are a marketing expert writing slogans based on product features and target audience. 
Your messaging should balance practicality and user needs, considering price, material, and seasonal context. 
Incorporate Korean cultural nuances when appropriate.
`.trim(),

  brand_manager: `
You are a professional copywriter crafting messages that align with brand tone and positioning strategy. 
Maintain consistency, reflect brand identity, and include subtle sophistication that resonates with Korean design values.
`.trim(),
};

export const outputTemplates: Record<OutputTarget, string> = {
  instagram: `
Create a short, emotionally resonant Instagram caption (under 20 characters in Korean if needed) 
with 3–5 culturally relevant hashtags that reflect Korean aesthetics and consumer sentiment.
`.trim(),

  x: `
Write a witty and concise post under 140 characters. 
Include hashtags that reflect modern Korean trends and appeal to tech-savvy users.
`.trim(),

  blog: `
Write an informational but friendly blog intro in Korean tone. 
Use a conversational style with warmth and trust-building elements. Hashtags are optional.
`.trim(),

  naver_shop: `
Write a persuasive product introduction and sales message optimized for Naver Shopping. 
Mention key features, price benefits, and include emotional hooks suitable for Korean consumers.
`.trim(),

  youtube: `
Write two parts: 1) a catchy thumbnail phrase (bold and short) and 2) a natural, engaging video description 
with emotive appeal and light-hearted Korean tone.
`.trim(),
};

export const imageTemplates: Record<ImageStyle, string> = {
  emotional:
    'A soft, emotionally warm product photo with pastel tones, natural lighting, and a minimal background. Capture the gentle and cozy feel favored in Korean lifestyle brands.',
  clickable:
    'A bold and eye-catching image optimized for clicks: high contrast, clear product focus, and bright lighting. Designed to attract attention on Korean social feeds.',
  luxury:
    'A premium-looking composition with elegant minimalism, deep shadows, and a sense of calm confidence. Reflects the visual tone of upscale Korean skincare or fashion ads.',
  eco: 'A nature-inspired product shot with real plants, wood textures, or eco-friendly materials. Uses daylight and organic compositions that appeal to Korea’s sustainability trend.',
  moodboard:
    'A stylized grid layout like a moodboard, using props, color palettes, and materials to express brand emotion. Popular among Korean design studios.',
  dynamic:
    'An energetic and action-oriented product shot, with strong motion cues and vivid colors. Suitable for fitness or K-pop fan goods.',
  seasonal:
    'A seasonal concept with props and color schemes matching Korean festivals or weather: cherry blossoms for spring, beaches for summer, cozy cafés for winter.',
  cold: 'A refreshingly cold-themed photo: icy surfaces, cool-toned lighting, and a crisp atmosphere. Mimics Korean beverage ads with emphasis on 청량감.',
  flyer:
    'A promotional image with price tag banners, bold Korean typography, and high-contrast layout. Emulates flyer-style ads in Korean online malls.',
};

export function buildPrompt(input: MarketingInput): string {
  return `
${strategyTemplates[input.userLevel]}

<Output Goal>
${outputTemplates[input.outputTarget]}

<Product Info>
${input.productInfo}

<Image Style>
${imageTemplates[input.imageStyle]}
  `.trim();
}
