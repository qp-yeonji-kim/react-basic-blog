// 커스텀 hooks에서는 useState, useRef를 가져와 쓸 수 있다.
import { useState, useRef } from "react"
import { v4 as uuidv4 } from 'uuid';

const useToast = () => { // use를 앞에 붙여 훅이라는 것을 암시.
  const toasts = useRef([]);
  const [, setToastRerender] = useState(false);

  const deleteToast = (id) => {
    const filteredToasts = toasts.current.filter(toast => {
      return toast.id !== id
    })

    toasts.current = filteredToasts;
    setToastRerender(prev => !prev);
  }
  
  const addToast = (toast) => {
    const id = uuidv4()
    const toastWidthId = {
      ...toast,
      id // id: id
    }

    toasts.current = [...toasts.current, toastWidthId];
    setToastRerender(prev => !prev);

    setTimeout(()=>{
      deleteToast(id, toasts, setToastRerender);
    }, 5000)
  };

  return [
    toasts.current,
    addToast,
    deleteToast
  ]
}

export default useToast;