import React from "react";
import { Link } from "react-router-dom";

function Pagination({ listLength, limit, setPage }) {
  const pages = Math.ceil(listLength / limit);
  const btns = [];
  for (let i = 1; i < pages + 1; i++) btns.push(i);

  function nextPage() {
    setPage((page) => (pages !== page ? page + 1 : page));
  }

  function previousPage() {
    setPage((page) => (page > 1 ? page - 1 : page));
  }

  return (
    <div>
      <nav
        aria-label="Page navigation example"
        className="flex justify-center items-center mt-5"
      >
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <Link
              onClick={previousPage}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-amber-700 bg-white border border-e-0 border-amber-200 rounded-s-lg hover:bg-amber-50 hover:text-amber-800 transition-colors duration-200"
            >
              Previous
            </Link>
          </li>
          {btns.map((btn) => (
            <li key={btn}>
              <Link
                onClick={() => setPage(btn)}
                className="flex items-center justify-center px-3 h-8 leading-tight text-amber-900 bg-white border border-amber-200 hover:bg-amber-50 hover:text-amber-800 transition-colors duration-200"
              >
                {btn}
              </Link>
            </li>
          ))}
          <li>
            <Link
              onClick={nextPage}
              className="flex items-center justify-center px-3 h-8 leading-tight text-amber-900 bg-white border border-amber-200 rounded-e-lg hover:bg-amber-50 hover:text-amber-800 transition-colors duration-200"
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
