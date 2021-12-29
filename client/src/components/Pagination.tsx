import React from 'react';

export const Pagination = ({ moviesPerPage, totalMovies }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalMovies / moviesPerPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex align-items-center justify-content-center">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
