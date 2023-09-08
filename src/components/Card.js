import PropTypes from 'prop-types';

const Card = ({ title, children, onClick }) => {
  return (
    <div
      className="card mb-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="card-body py-2 d-flex align-items-center">
        <div class="flex-grow-1">{title}</div>
        {children && <div>{children}</div>}
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