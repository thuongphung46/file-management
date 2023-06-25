export type Song = {
  id: number;
  name: string;
  category: any;
  url: string;
  thumbnailUrl: string;
  creatorId: any;
  createdAt: string;
  downloadCount: number;
  listenedCount: number;
};

export interface NewSong {
  name: string;
  category: any;
  creator: any;
}
