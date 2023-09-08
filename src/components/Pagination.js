import propTypes from "prop-types";
import classNames from "classnames";

const Pagination = ({ currentPage }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link">Previous</a>
        </li>
        {
          Array(numberOfPages).fill(1).map((value, index)=> value + index).map((pageNumber)=> {
            return (
              <li className={classNames('page-item', {active: currentPage === 1})}>
                <a className="page-link" href="#">
                  {pageNumber}
                </a>
              </li>
            )
          })
        }
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage:  propTypes.number,
  numberOfPages: propTypes.number,
}

Pagination.defaultProps = {
  currentPage:  1,
  numberOfPages: 5,
}

export default Pagination;