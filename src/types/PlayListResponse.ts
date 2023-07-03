export type PlayListRoot = {
  id: number;
  name: string;
  creatorId?: CreatorId;
  createdAt: string;
  songs: any[];
  favorite: boolean;
};

export type CreatorId = {
  id: number;
  userName: string;
  password: string;
  name: string;
  avatarUrl: string;
  followers: any[];
  followersCount: number;
  createdAt: string;
  playlists: Playlist[];
};

export type Playlist = {
  id: number;
  name: string;
  creatorId: number;
  createdAt: string;
  songs: any[];
  favorite: boolean;
};

export type NewPlaylist = {
  id: string;
  name: string;
};
