import Pagination from "../Pagination";
import { useMemo } from "react";

import { IAlbumItem } from "types";
import AlbumItem from "../AlbumItem";

interface IProps {
  page: number;
  data: IAlbumItem[];
}

const Album = ({ page, data }: IProps) => {
  const AlbumList = useMemo(() => {
    const pageAlbumList = data.slice((page - 1) * 5, page * 5);
    return (
      <div>
        <ul>
          {pageAlbumList.map((item: IAlbumItem) => (
            <AlbumItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    );
  }, [page, data]);

  return (
    <div>
      <main>
        <h1>앨범</h1>
        <div>{AlbumList}</div>
      </main>
      <footer>
        <Pagination page={page} dataLen={data.length} />
      </footer>
    </div>
  );
};

export default Album;
