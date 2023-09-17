import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";
import Card from '../components/Card';
import Pagination from "./Pagination";
import Toast from "./Toast";
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [toasts, setToasts] = useState([]);
  const limit = 5;

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / limit)) ;
  }, [numberOfPosts])

  const getPosts = useCallback((page = 1) => { 
    let params = {
      _page: page,
      _limit: limit,
      _sort: 'id',
      _order: 'desc',
      title_like: searchText
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
  }, [isAdmin, searchText])

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, []);

  const deleteToast = (id) => {
    const filteredToasts = toasts.filter(toast => {
      return toast.id !== id
    })

    setToasts(filteredToasts);
  }
  
  const addToast = (toast) => {
    const id = uuidv4()
    const toastWidthId = {
      ...toast,
      id // id: id
    }

    setToasts(prev=> [...prev, toastWidthId]);

    setTimeout(()=>{
      deleteToast(id);
    }, 5000)
  };


  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      addToast({
        text: 'Successfully deleted',
        type: 'success'
      });
    });
  };

  const onClickPageButton = (page) => {
    history.push(`${location.pathname}?page=${page}`); // 이전 url 기록이 남게 됨.
    setCurrentPage();
    getPosts(page);
  }

  if (loading) {
    return (
      <LoadingSpinner/>
    )
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

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      history.push(`${location.pathname}?page=1`); 
      setCurrentPage(1);
      getPosts(1);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search.."
        value={searchText}
        className="form-control"
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={onSearch}
      />
      <hr />
      {posts.length === 0 ? <div>No blog posts found</div> : (
        <>
          {renderBlogList()}
          {
            numberOfPages > 1 && (
              <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onClick={onClickPageButton} />
            )
          }
        </>
      )}
      <Toast
        toasts={toasts}
        deleteToast={deleteToast}
      />
    </div>
  )
};

BlogList.propTypes = {
  isAdmin: propTypes.bool
};

BlogList.defaultProps = {
  isAdmin: false
}

export default BlogList;