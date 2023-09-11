import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import LoadingSpinner from "../components/LoadingSpinner";
import Card from '../components/Card';
import Pagination from "./Pagination";
import { bool } from "prop-types";

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);

  const getPosts = (page = 1) => {
    setCurrentPage(page);
    // 2. 쿼리스트링이 길어지면 params에 담아 쓸 수 있다.
    let params = {
      _page: page,
      _limit: 5,
      _sort: 'id',
      _order: 'desc',
      // publish: true, // publish 변수에 대해 필터링한 데이터를 프론트에서 처리하면 sort가 잘 안된다. 그래서 백엔드에서 처리하는게 나음.
    }

    if (!isAdmin) {
      params = { ...params, publish: true}
    }

    // 1. posts 뒤에 쿼리스트링을 붙여 데이터 가져오는 조건을 설정한다.
    // axios.get(`http://localhost:3001/posts?_page=${page}&_limit=5&_sort=id&_order=desc`, {
    axios.get(`http://localhost:3001/posts`, {
      params
    }).then((res) => {
      setPosts(res.data);
      setLoading(false);
    })
  }

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner/>
    )
  }

  if (posts.length === 0) {
    return (<div>No blog posts found</div>)
  }

  const renderBlogList = () => {
      return posts.filter(post => {
        return isAdmin || post.publish
      }).map(post => {
        return (
          <Card
            key={post.id}
            title={post.title}
            onClick={() => history.push(`/blogs/${post.id}`)}>
            <div>
              {
                isAdmin ? (
                  <div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => deleteBlog(e, post.id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : null
              }
            </div>
          </Card>
        )
      })
    }

  return (
    <div>
      {renderBlogList()}
      <Pagination currentPage={currentPage} numberOfPages={5} onClick={getPosts} />
    </div>
  )
};

BlogList.propTypes = {
  isAdmin: bool
};

BlogList.defaultProps = {
  isAdmin: false
}

export default BlogList;