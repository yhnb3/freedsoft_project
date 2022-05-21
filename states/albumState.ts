import { atom } from "recoil";
import { IAlbumItem } from "types";

export const albumState = atom<IAlbumItem[]>({
  key: "albumState",
  default: [],
});

export const idState = atom<number>({
  key: "idState",
  default: 101,
});
