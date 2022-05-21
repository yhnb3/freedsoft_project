import { ChangeEvent, ReactElement, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import store from "store";

import styles from "./create.module.scss";
import Layout from "components/Layout";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { albumState, idState } from "states/albumState";
import { userState } from "states/userState";
import { useMountCommon } from "hooks";

function Create() {
  const [inputValue, setInputValue] = useState("");
  const setAlbumData = useSetRecoilState(albumState);
  const router = useRouter();
  const userId = useRecoilValue(userState);
  const [id, setId] = useRecoilState(idState);

  useMountCommon();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setInputValue(value);
  };

  const handleClick = () => {
    setAlbumData((prev) => {
      console.log(prev);
      const newArr = [{ userId, title: inputValue, id }, ...prev];
      console.log(newArr);
      store.set("albumList", newArr);
      return newArr;
    });
    setId((prev) => prev + 1);
    router.push("/album/1");
  };

  const btnIsAble = inputValue.length === 0 ? false : true;

  return (
    <div className={styles.createContainer}>
      <p className={styles.createTitle}>글쓰기</p>
      <label htmlFor="title">Title</label>
      <input name="title" value={inputValue} onChange={handleChange}></input>
      <div className={styles.btnBox}>
        <div />
        <button
          className={cx({ [styles.isAble]: btnIsAble })}
          type="button"
          onClick={handleClick}
          disabled={!btnIsAble}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default Create;

Create.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
