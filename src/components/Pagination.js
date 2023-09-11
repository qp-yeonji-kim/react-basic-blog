import propTypes from "prop-types";
import classNames from "classnames";

const Pagination = ({ currentPage, numberOfPages, onClick, limit }) => {
  const currentSet = Math.ceil(currentPage / limit);
  const lastSet = Math.ceil(numberOfPages / limit);
  // 0~5가 같은 세트에 들어가려면 내림이 아닌 올림을 해줘야 함.. 직관적으로 느껴지진 않지만 따져보니 그러하다
  const startPage = limit * (currentSet - 1) + 1;
  const numberOfPageForSet = currentSet === lastSet ? numberOfPages % limit : limit

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {
          currentSet !== 1 && (
            <li className={classNames('page-item', {disabled: currentSet === 1})}>
              <div className="page-link cursor-pointer" onClick={()=> {
                onClick(startPage - limit)
              }}>
                Previous
              </div>
            </li>
          )
        }
        {
          Array(numberOfPageForSet).fill(startPage)
          .map((value, index)=> value + index)
          .map((pageNumber)=> {
            return (
              <li className={classNames('page-item', {active: currentPage === pageNumber})} key={pageNumber}>
                <div className="page-link cursor-pointer" onClick={()=>{
                  onClick(pageNumber);
                }}>
                  {pageNumber}
                </div>
              </li>
            )
          })
        }
        {
          currentSet !== lastSet && (
            <li className={classNames('page-item', {disabled: currentSet === lastSet})}>
              <div className="page-link cursor-pointer" onClick={()=> {
                onClick(startPage + limit)
              }}>
                Next
              </div>
            </li>
          )
        }
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage:  propTypes.number,
  numberOfPages: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
  limit: propTypes.number
}

Pagination.defaultProps = {
  currentPage:  1,
  limit: 5,
}

export default Pagination;