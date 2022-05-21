import Image from "next/image";
import Link from "next/link";

import styles from "./albumItem.module.scss";

interface IProps {
  item: {
    userId: number;
    id: number;
    title: string;
  };
}

const AlbumItem = ({ item }: IProps) => {
  return (
    <li className={styles.itemContainer}>
      <p className={styles.title}>{item.title}</p>
      <Link href={`/detail/${item.id}`}>
        <button type="button">
          <Image
            src="https://place-hold.it/500x300"
            width={500}
            height={300}
            alt={item.title}
          />
        </button>
      </Link>
    </li>
  );
};

export default AlbumItem;
