import Head from "next/head";
import { ReactNode } from "react";

import styles from "./layout.module.scss";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Freed Album</title>
        <meta name="description" content="Helmet application" />
      </Head>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
