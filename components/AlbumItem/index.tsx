interface IProps {
  item: {
    userId: number;
    id: number;
    title: string;
  };
}

const AlbumItem = ({ item }: IProps) => {
  return <p>{item.title}</p>;
};

export default AlbumItem;
