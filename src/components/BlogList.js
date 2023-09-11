import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { bool } from "prop-types";
import LoadingSpinner from "../components/LoadingSpinner";
import Card from '../components/Card';
import Pagination from "./Pagination";

const BlogList = ({ isAdmin }) => {
  // const location = useLocation(); // 1. 이 코드를 통해 다음을 얻을 수 있다.
  // console.log(location.search) // ?page=2
  // const params = new URLSearchParams(location.search); // 2. 이 코드를 통해서 url 뒤의 숫자만 빼올 수 있다.
  // console.log(params.get('page')); // 2
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const limit = 5;

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / limit)) ;
  }, [numberOfPosts])

  const getPosts = useCallback((page = 1) => { 
    // getPosts의 값이 바뀔 때 useEffect가 실행되게끔 수정하면.. 
    // 문제는 새롭게 렌더링 될 때마다 getPosts라는 함수가 재생성된다 (똑같은데 계속 재생성됨)
    // 함수를 기억하게끔 useCallback을 사용하면 [isAdmin]의 값이 바뀔 때만 함수가 재랜더링된다.
    let params = {
      _page: page,
      _limit: limit,
      _sort: 'id',
      _order: 'desc',
    }

    if (!isAdmin) {
      params = { ...params, publish: true}
    }

    axios.get(`http://localhost:3001/posts`, {
      params
    }).then((res) => {
      setNumberOfPosts(res.headers['x-total-count']);
      setPosts(res.data);
      setLoading(false);
    })
  }, [isAdmin])

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1); // ||: parseInt(pageParam)값이 없으면 1을 넣어줌.
    getPosts(parseInt(pageParam) || 1); // string으로 pageParam값이 오기 때문에 처리해줘야 함.
  }, [pageParam])

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    });
  }

  const onClickPageButton = (page) => {
    history.push(`${location.pathname}?page=${page}`); // 이전 url 기록이 남게 됨.
  }

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
      {
        numberOfPages > 1 && (
          <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onClick={onClickPageButton} />
        )
      }
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