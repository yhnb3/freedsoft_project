import { useRecoilState } from "recoil";
import { useMemo } from "react";
import { GetServerSideProps } from "next";
import { useMount } from "react-use";
import store from "store";

import { albumState } from "states/albumState";
import { IAlbumItem } from "types";
import AlbumItem from "components/AlbumItem";
import Pagination from "components/Pagination";

interface IProps {
  page: number;
  data: IAlbumItem[];
}
const Album = ({ page }: IProps) => {
  const [albumData, setAlbumData] = useRecoilState(albumState);
  useMount(() => {
    const data = store.get("albumList");
    setAlbumData(data);
  });

  const AlbumList = useMemo(() => {
    const pageAlbumList = albumData.slice((page - 1) * 5, page * 5);
    return (
      <ul>
        {pageAlbumList.map((item: IAlbumItem) => (
          <AlbumItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }, [page, albumData]);
  return (
    <div>
      <main>
        <h1>앨범</h1>
        <div>{AlbumList}</div>
      </main>
      <footer>
        <Pagination page={page} dataLen={albumData.length} />
      </footer>
    </div>
  );
};

export default Album;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context?.params?.id);
  return {
    props: {
      page: id,
    },
  };
};
