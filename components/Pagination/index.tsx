import Link from "next/link";
import { useMemo } from "react";

import styles from "./pagination.module.scss";
import cx from "classnames";

interface IProps {
  dataLen: number;
  page: number;
}

const Pagination = ({ dataLen, page }: IProps) => {
  const lastPage = Math.round(dataLen / 5);
  const firstPage = 1;
  const prevBtn = useMemo(() => {
    if (page === firstPage) {
      return <span className={styles.pageLink}>이전</span>;
    }
    return (
      <Link href={`/album/${page - 1}`}>
        <button className={cx(styles.pageLink, styles.isValid)}>이전</button>
      </Link>
    );
  }, [page]);

  const nextBtn = useMemo(() => {
    if (page === lastPage) {
      return <span className={styles.pageLink}>다음</span>;
    }
    return (
      <Link href={`/album/${page + 1}`}>
        <button className={cx(styles.pageLink, styles.isValid)}>다음</button>
      </Link>
    );
  }, [page, lastPage]);

  return (
    <div className={styles.paginationContainer}>
      {prevBtn}
      {nextBtn}
    </div>
  );
};

export default Pagination;
