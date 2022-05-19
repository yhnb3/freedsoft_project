import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import { useSetRecoilState } from "recoil";
import store from "store";

import styles from "../styles/Home.module.css";
import { albumState } from "states/albumState";

const Home: NextPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isValidation, setIsValidation] = useState(false);
  const [idValidate, setIdValidate] = useState(false);
  const [passwrodIsValidate, setPasswordIsValidate] = useState(false);
  const setAlbum = useSetRecoilState(albumState);
  const router = useRouter();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const lengthValidate = value.length < 8 ? false : true;
    const numberValidate = /([0-9])+/.test(value);
    const wordValidate = /([A-Za-z])+/.test(value);
    if (lengthValidate && numberValidate && wordValidate) {
      setPasswordIsValidate(true);
    } else {
      setPasswordIsValidate(false);
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

    // router.push("/album/1");
    console.log("submit");
  };

  // const isAbleButton = idValidate && passwrodIsValidate

  return (
    <div className={styles.container}>
      <Head>
        <title>freed Album</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleIdChange} value={id} />
          <input
            type="password"
            onChange={handlePasswordChange}
            value={password}
          />
          <button type="submit">로그인</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
