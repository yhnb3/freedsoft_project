import { atom } from "recoil";

export const userState = atom<number>({
  key: "userState",
  default: 11,
});
