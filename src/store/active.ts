import { atom } from "jotai";
import { Album, Artist, SimplifiedArtist, Track } from "../types/spotify";

export const activeArtist = atom<Partial<SimplifiedArtist>>({
  id: null,
  type: null,
});

export const activeItems = atom<(Track | Artist | Album)[]>([]);
