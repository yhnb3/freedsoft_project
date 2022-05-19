import { atom } from "recoil";
import { IAlbumItem } from "types";

export const albumState = atom<IAlbumItem[]>({
  key: "albumState",
  default: [],
});
