import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { useRecoilState } from "recoil";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useMount } from "react-use";
import store from "store";
import cx from "classnames";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import styles from "./detail.module.scss";
import Layout from "components/Layout";
import { albumState } from "states/albumState";
import { IAlbumItem } from "types";
import Pencil from "public/pencil.svg";
import { userState } from "states/userState";

interface IProps {
  id: number;
}

function Detail({ id }: IProps) {
  const [albumData, setAlbumData] = useRecoilState(albumState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [userId, setUserId] = useRecoilState(userState);
  const router = useRouter();

  useMount(() => {
    const data = store.get("albumList");
    const userId = store.get("userId");
    if (!userId) {
      router.push("");
    }
    setUserId(userId);
    setAlbumData(data);
    const albumIndex = data.findIndex((item: IAlbumItem) => item.id === id);
    const album = data[albumIndex];
    setTitleValue(album.title);
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTitleValue(value);
  };
  const handlePencilClick = () => {
    setIsEditMode((prev) => !prev);
  };
  const handleDeleteClick = () => {
    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "취소",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setAlbumData((prev) => {
          const newArr = prev.filter((item: IAlbumItem) => item.id !== id);
          store.set("albumList", newArr);
          return newArr;
        });
        router.push("/album/1");
      }
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setAlbumData((prev) => {
      const filteredArr = prev.filter((item: IAlbumItem) => item.id !== id);
      const newArr = [
        { id, userId: album.userId, title: titleValue },
        ...filteredArr,
      ];
      store.set("albumList", newArr);
      return newArr;
    });
    setIsEditMode((prev) => !prev);
  };
  if (albumData.length === 0) return <p>hi</p>;

  const albumIndex = albumData.findIndex((item: IAlbumItem) => item.id === id);
  const album = albumData[albumIndex];
  if (!album) return null;
  const editable = userId === album.userId;

  return (
    <div className={styles.detailContainer}>
      {isEditMode ? (
        <div className={styles.titleContainer}>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              value={titleValue}
              onChange={handleChange}
            />
          </form>
        </div>
      ) : (
        <div className={styles.titleContainer}>
          <p className={styles.title}>{album.title}</p>
          <div className={styles.iconBox}>
            <div />
            <button className={cx({ [styles.editable]: editable })}>
              <Pencil onClick={handlePencilClick} />
            </button>
          </div>
        </div>
      )}
      <Image
        src="https://place-hold.it/1000x600"
        alt={album.title}
        width={1000}
        height={600}
      />
      <div className={styles.btnBox}>
        <div />
        <button
          className={cx({ [styles.editable]: editable })}
          onClick={handleDeleteClick}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context?.params?.id);
  return {
    props: {
      id,
    },
  };
};

Detail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
