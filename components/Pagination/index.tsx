import Link from "next/link";
import { useMemo } from "react";

interface IProps {
  dataLen: number;
  page: number;
}

const Pagination = ({ dataLen, page }: IProps) => {
  const lastPage = Math.round(dataLen / 5);
  const firstPage = 1;
  const prevBtn = useMemo(() => {
    if (page === firstPage) {
      return <span>이전</span>;
    }
    return <Link href={`/album/${page - 1}`}>이전</Link>;
  }, [page]);

  const nextBtn = useMemo(() => {
    if (page === lastPage) {
      return <span>다음</span>;
    }
    return <Link href={`/album/${page + 1}`}>다음</Link>;
  }, [page, lastPage]);

  return (
    <div>
      {prevBtn}
      {nextBtn}
    </div>
  );
};

export default Pagination;
