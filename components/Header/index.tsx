import Link from "next/link";
import { useRouter } from "next/router";
import store from "store";

import styles from "./header.module.scss";

const Header = () => {
  const router = useRouter();

  const handleLogoutClick = () => {
    store.remove("userId");
    store.remove("albumList");
    router.push("/");
  };

  return (
    <div className={styles.headerContainer}>
      <Link href="/create">
        <button>글쓰기</button>
      </Link>
      <button onClick={handleLogoutClick}>로그아웃</button>
    </div>
  );
};

export default Header;
