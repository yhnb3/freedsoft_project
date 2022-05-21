import { useRecoilState, useRecoilValue } from "recoil";
import { ReactElement, useMemo } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useMount } from "react-use";
import store from "store";

import styles from "./albumList.module.scss";
import { albumState } from "states/albumState";
import { IAlbumItem } from "types";
import AlbumItem from "components/AlbumItem";
import Pagination from "components/Pagination";
import Layout from "components/Layout";
import { useMountCommon } from "hooks";

interface IProps {
  page: number;
  data: IAlbumItem[];
}
function Album({ page }: IProps) {
  const albumData = useRecoilValue(albumState);
  const router = useRouter();

  useMountCommon();

  const handleClick = () => {
    router.push("/create");
  };

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
    <div className={styles.listContainer}>
      <p className={styles.title}>Freed Album</p>
      <div>{AlbumList}</div>
      <Pagination page={page} dataLen={albumData.length} />
      <button className={styles.createBtn} onClick={handleClick}>
        +
      </button>
    </div>
  );
}

export default Album;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context?.params?.id);
  return {
    props: {
      page: id,
    },
  };
};

Album.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
