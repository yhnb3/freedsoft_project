import { useRecoilState } from "recoil";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useMount } from "react-use";
import store from "store";

import { albumState } from "states/albumState";
import { IAlbumItem } from "types";

interface IProps {
  id: number;
}

const Detail = ({ id }: IProps) => {
  const [albumData, setAlbumData] = useRecoilState(albumState);
  const router = useRouter();
  useMount(() => {
    const data = store.get("albumList");
    setAlbumData(data);
  });

  const handleClick = () => {
    router.back();
  };
  const album = albumData.filter((item: IAlbumItem) => item.id === id)[0];
  if (album === undefined) return <p>hi</p>;
  return (
    <div>
      <h1>{album.title}</h1>
      <button>수정</button>
      <button onClick={handleClick}>뒤로가기</button>
    </div>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context?.params?.id);
  return {
    props: {
      id,
    },
  };
};
