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

  const getPosts = () => {
    axios.get('http://localhost:3001/posts').then((res) => {
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
      <Pagination />
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