import Header from "components/Header";
import Head from "next/head";
import { ReactNode } from "react";

import styles from "./layout.module.scss";

interface Props {
  isLogin?: boolean;
  children: ReactNode;
}

function Layout({ children, isLogin }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Freed Album</title>
        <meta name="description" content="Helmet application" />
      </Head>
      {isLogin === undefined && <Header />}
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
