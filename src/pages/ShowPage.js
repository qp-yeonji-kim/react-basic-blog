import { useParams } from "react-router";
import axios from 'axios';
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const ShowPage = () => {
  const { id } = useParams(); // page 주소 id에 해당되는값
  const [post, setPost] = useState(null); // post는 뭐지?
  const [loading, setLoading] = useState(true);

  const getPost = (id) => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
      setPost(res.data)
      setLoading(false);
    })
  };

  useEffect(() => { // 의존성 배열이라고 부름.
    getPost(id)
  }, [id]) // 빈배열이면 한 번만 실행되고 []안에 값이 있으면 그 값이 바뀔 때마다 실행됨

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  }

  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <div>
      <div className="d-flex">
        <h1 className="flex-grow-1">{post.title}</h1>
        <Link
            className="btn btn-primary"
            to={`/blogs/${id}/edit`}
        >
          Edit
        </Link>
      </div>
      <small class="text-muted">
        Created At: {printDate(post.createdAt)}
      </small>
      <hr/>
      <p>{post.body}</p>
    </div>
  );
};

export default ShowPage;