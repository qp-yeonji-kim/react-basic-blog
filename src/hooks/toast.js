// 커스텀 hooks에서는 useState, useRef를 가져와 쓸 수 있다.
import { v4 as uuidv4 } from 'uuid';
import { addToast as add, removeToast } from '../store/toastSlice';
import { useDispatch } from 'react-redux';

const useToast = () => { // use를 앞에 붙여 훅이라는 것을 암시.
  const dispatch = useDispatch(); // action을 dispatch를 통해 보낸다.

  const deleteToast = (id) => {
    dispatch(removeToast(id));
  }
  
  const addToast = (toast) => {
    const id = uuidv4()
    const toastWidthId = {
      ...toast,
      id
    }

    dispatch(add(toastWidthId));

    setTimeout(()=>{
      deleteToast(id);
    }, 5000)
  };

  return {
    addToast,
    deleteToast
  }
}

export default useToast;