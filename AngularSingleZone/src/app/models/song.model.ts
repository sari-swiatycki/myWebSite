export enum Categories {
    Pop = 0,
    Rock = 1,
    HipHop = 2,
    Electronic = 3,
    Classical = 4,
    Jazz = 5,
    Other = 6,
  }
  
  export interface Song {
    id: number
    title: string
    artist: string
    genere: string
    audioUrl: string
    tags: string
    category: Categories
    rating?: number
  }
  