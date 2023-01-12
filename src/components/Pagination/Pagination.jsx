import React from 'react';
import { Link } from 'gatsby';
import range from 'lodash/range';
import clamp from 'lodash/clamp';

function PaginationButton ({ page, currentPage }) {
  const url = page === 1 ? '' : page.toString();
  return (
    <span title={`Go to page${page}`} aria-label={`Go to page${page}`} className={currentPage === page ? 'active' : ''}>
      <Link to={'./' + url}>
        {page}
      </Link>
    </span>
  );
}

const angleDoubleLeft = ('«')
const angleDoubleRight = ('»')

function Pagination ({ currentPage, pageCount, hasNextPage, hasPreviousPage }) {
  const pages = range(
    clamp(currentPage - 5, 1, pageCount),
    clamp(currentPage + 9, pageCount)
  ).slice(0, 10);
  // flex and center align it
  return (
    <div className="pagination">
      {!pageCount != 1 && pages.includes(1) && (
        <Link to={'./'}>
          <span title="Go to first page" aria-label="Go to first page">
            {angleDoubleLeft}
          </span>
        </Link>
      )}
      {pages.map(page => (
        <PaginationButton key={page} page={page} currentPage={currentPage} />
      ))}
      {pageCount != 1 && !pages.includes(pageCount - 1) && (
        <span title="Go to last page" aria-label="Go to last page">
          <Link to={'/' + (pageCount - 1).toString()}>
            {angleDoubleRight}
          </Link>
        </span>
      )}
    </div>
  );
}

export default Pagination;
