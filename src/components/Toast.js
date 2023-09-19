import propTypes from 'prop-types';

const Toast = ({ toasts, deleteToast }) => {
  return (
    <div className="position-fixed end-0 bottom-0 p-2">
      {
        toasts.map(toast => {
          return (
            <div
              className={`alert alert-${toast.type ? toast.type : 'success'} m-0 py-2 mt-2 cursor-pointer`}
              onClick={() => deleteToast(toast.id)}
              key={toast.id}
            >
              {toast.text}
            </div>
          )
        })
      }
    </div>
  );
};

Toast.propTypes = {
  toasts: propTypes.arrayOf(propTypes.shape({
    text: propTypes.string,
    type: propTypes.string
  })).isRequired,
  deleteToast: propTypes.func
}

Toast.defaultProps = {
  toasts: {}
}
export default Toast;