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

export interface MarketingInput {
  userLevel: UserLevel;
  outputTarget: OutputTarget;
  imageStyle: ImageStyle;
  productInfo: string;
  imageUrls?: string[]; // <- 여기 추가 (선택적)
}
