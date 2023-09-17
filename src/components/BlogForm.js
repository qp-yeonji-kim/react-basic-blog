import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import propTypes from 'prop-types';
import classNames from "classnames";
import Toast from "./Toast";
import { v4 as uuidv4 } from 'uuid';

const BlogForm = ({ editing }) => {
  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [body, setBody] = useState("");
  const [originalBody, setOriginalBody] = useState("");
  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  // const [toasts, setToasts] = useState([]);
  const toasts = useRef([]); // 값이 바뀌어도 리랜더링이 일어나지 않는다.
  const [toastRerender, setToastRerender] = useState(false);

  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setOriginalTitle(res.data.title);
        setBody(res.data.body);
        setOriginalBody(res.data.body);
        setPublish(res.data.publish);
        setOriginalPublish(res.data.publish);
      });
    }
  }, [id, editing]);

  const deleteToast = (id) => {
    const filteredToasts = toasts.current.filter(toast => {
      return toast.id !== id
    })

    // setToasts(filteredToasts);
    toasts.current = filteredToasts;
    setToastRerender(prev => !prev);
  }
  
  const addToast = (toast) => {
    const id = uuidv4()
    const toastWidthId = {
      ...toast,
      id // id: id
    }

    // setToasts(prev=> [...prev, toastWidthId]);
    toasts.current = [...toasts.current, toastWidthId];
    setToastRerender(prev => !prev);

    setTimeout(()=>{
      deleteToast(id);
    }, 5000)
  };

  const isEdited = () => {
    return title !== originalTitle
      || body !== originalBody
      || publish !== originalPublish;
  };

  const goBack = () => {
    if (editing) {
      history.push(`/blogs/${id}`);
    } else {
      history.push(`/blogs`);
    }
  };

  const onChangePublish = (e) => {
    console.log(e.target.checked)
    setPublish(e.target.checked)
  }

  const validateForm = () => {
    let validated = true;
    if (title === '') {
      setTitleError(true)
      validated = false;
    }
    if (body === '') {
      setBodyError(true)
      validated = false;
    }
    return validated;
  }

  const onSubmit = () => {
    setTitleError(false);
    setBodyError(false);
    if (validateForm()) {
      if (editing) {
        axios
          .patch(`http://localhost:3001/posts/${id}`, {
            title,
            body,
            publish
          })
          .then((res) => {
            console.log(res);
            history.push(`/blogs/${id}`);
            addToast();
          });
      } else {
        axios
          .post("http://localhost:3001/posts", {
            title,
            body,
            createdAt: Date.now(), // 현재 시간 가져오기
            publish
          })
          .then(() => {
            // history.push("/admin");
            addToast({
              type: 'success',
              text: 'Successfully Created!'
            });
          });
      }
    }
  };

  return (
    <div>
      <h1>{editing ? "Edit" : "Create"} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className={classNames('form-control', {'border-danger': titleError})}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        {
          titleError && (
            <div className="text-danger">
              Title is required.
            </div>
          )
        }
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className={classNames('form-control', {'border-danger': bodyError})}
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          rows="10"
        />
        {
          bodyError && (
            <div className="text-danger">
              Body is required.
            </div>
          )
        }
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={publish}
          onChange={onChangePublish}
        />
        <label className="form-check-label">
          Publish
        </label>
      </div>
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && isEdited()}
      >
        {editing ? "Edit" : "Post"}
      </button>
      <button
        className="btn btn-danger ms-2"
        onClick={goBack}
      >
        Cancel
      </button>

      <Toast
        // toasts={toasts}
        toasts={toasts.current}
        deleteToast={deleteToast}
      />
    </div>
  );
};

BlogForm.propTypes = {
  editing: propTypes.bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;