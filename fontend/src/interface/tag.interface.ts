export interface Tag {
  tag_id: number;
  name: string;
  picture: string;
  desc: string;
  created_at: number;
  updated_at: number;
  articlesCount?: number;
}
