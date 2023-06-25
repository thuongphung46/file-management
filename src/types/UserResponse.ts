export interface User {
  id: number;
  userName: string;
  password: string;
  name: string;
  avatarUrl: string;
  followers: any[];
  followersCount: number;
  createdAt: string;
  playlists: Playlist[];
}
export interface NewUser {
  username: string;
  password: string;
  name: string;
}

export interface Playlist {
  id: number;
  name: string;
  creatorId: number;
  createdAt: string;
  songs: any[];
  favorite: boolean;
}
