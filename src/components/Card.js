import PropTypes from 'prop-types';

const Card = ({ title, children, onClick }) => {
  return (
    <div
      className="card mb-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>{title}</div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  onClick: PropTypes.func,
}

Card.defaultProps = { // 필수가 아닌 값들 넣어주면 됨..
  children: null,
  onClick: () => {}
}

export default Card;