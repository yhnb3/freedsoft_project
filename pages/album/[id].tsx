import { GetServerSideProps } from "next/types";
import { IAlbumItem } from "types";
import Album from "../../components/Album";

interface IProps {
  page: number;
  data: IAlbumItem[];
}

export default function TvDetail({ data, page }: IProps) {
  return <Album data={data} page={page} />;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context?.params?.id);
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  const data = await response.json();
  return {
    props: {
      data: data,
      page: id,
    },
  };
};
