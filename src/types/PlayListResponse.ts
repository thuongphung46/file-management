export type PlayListRoot = {
  id: string;
  name: string;
  creatorId: CreatorId;
  createdAt: string;
  songs: any[];
  favorite: boolean;
};

export type CreatorId = {
  id: string;
  userName: string;
  password: string;
  name: string;
  avatarUrl: string;
  followers: any[];
  followersCount: string;
  createdAt: string;
  playlists: Playlist[];
};

export type Playlist = {
  id: string;
  name: string;
  creatorId: string;
  createdAt: string;
  songs: any[];
  favorite: boolean;
};

export type NewPlaylist = {
  id: string;
  name: string;
};
