import { useRouter } from "next/router";
import { useMount } from "react-use";
import { useSetRecoilState } from "recoil";
import { albumState } from "states/albumState";
import { userState } from "states/userState";
import store from "store";

export const useMountCommon = () => {
  const setAlbumData = useSetRecoilState(albumState);
  const setUserId = useSetRecoilState(userState);
  const router = useRouter();

  useMount(() => {
    const albumData = store.get("albumList");
    const id = store.get("userId");
    if (!id) {
      router.push("/");
    }
    setAlbumData(albumData);
    setUserId(id);
  });
};
