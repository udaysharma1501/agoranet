import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">Post Detail for ID: {id}</h1>;
};
export default PostDetail;
