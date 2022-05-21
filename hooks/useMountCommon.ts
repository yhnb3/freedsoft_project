import { useRouter } from "next/router";
import { useMount } from "react-use";
import { useSetRecoilState } from "recoil";
import { albumState, idState } from "states/albumState";
import store from "store";

export const useMountCommon = () => {
  const setAlbumData = useSetRecoilState(albumState);
  const setId = useSetRecoilState(idState);
  const router = useRouter();

  useMount(() => {
    const albumData = store.get("albumList");
    const id = store.get("userId");
    if (!id) {
      router.push("/");
    }
    setAlbumData(albumData);
    setId(id);
  });
};
