import { useState, ChangeEvent, FormEvent, ReactElement } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import store from "store";
import cx from "classnames";

import styles from "./home.module.scss";
import { albumState } from "states/albumState";
import Layout from "components/Layout";

function Home() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idValidate, setIdValidate] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const setAlbum = useSetRecoilState(albumState);
  const router = useRouter();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const lengthValidate = value.length < 8 ? false : true;
    const numberValidate = /([0-9])+/.test(value);
    const wordValidate = /([A-Za-z])+/.test(value);
    if (!lengthValidate) {
      setPasswordMsg("8자 이상의 비밀번호를 입력하세요.");
    } else if (!wordValidate) {
      setPasswordMsg("영어를 포함하여 비밀번호를 입력하세요.");
    } else if (!numberValidate) {
      setPasswordMsg("숫자를 포함하여 비밀번호를 입력하세요.");
    }
    if (lengthValidate && numberValidate && wordValidate) {
      setPasswordValidate(true);
    } else {
      setPasswordValidate(false);
    }
    setPassword(event.currentTarget.value);
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const validationRegx =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (validationRegx.test(value)) {
      setIdValidate(true);
    } else {
      setIdValidate(false);
    }
    setId(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => {
        store.set("albumList", data);
        setAlbum(data);
        router.push("/album/1");
      });
  };

  const isValid = idValidate && passwordValidate;

  return (
    <div className={styles.loginContainer}>
      <label htmlFor="id">ID</label>
      <input type="text" name="id" onChange={handleIdChange} value={id} />
      <p
        className={cx(styles.warningMsg, {
          [styles.isValid]: id.length === 0 || idValidate,
        })}
      >
        이메일 형식으로 입력하세요.
      </p>
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        onChange={handlePasswordChange}
        value={password}
      />
      <p
        className={cx(styles.warningMsg, {
          [styles.isValid]: password.length === 0 || passwordValidate,
        })}
      >
        {passwordMsg}
      </p>
      <button
        className={cx(styles.loginBtn, { [styles.isValid]: isValid })}
        type="submit"
        onClick={handleSubmit}
        disabled={!isValid}
      >
        로그인
      </button>
    </div>
  );
}

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
