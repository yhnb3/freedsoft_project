import Link from "next/link";

interface IProps {
  item: {
    userId: number;
    id: number;
    title: string;
  };
}

const AlbumItem = ({ item }: IProps) => {
  return (
    <li>
      <Link href={`/detail/${item.id}`}>
        <p>{item.title}</p>
      </Link>
    </li>
  );
};

export default AlbumItem;
