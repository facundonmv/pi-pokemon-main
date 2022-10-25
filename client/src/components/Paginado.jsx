import React from "react";
import '../styles/Paginado.css'

export default function Pagination({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
    setPokemonsToShow,
    maxLimit,
    setMaxLimit,
    minLimit,
    setMinLimit,
    pageLimit,
    setPageLimit,
}) {
    let pages = [];

    for (let x = 1; x <= Math.ceil(totalPosts / postsPerPage); x++) {
        pages.push(x);
    }

    const rederPagination = pages.map((page, index) => {
        if (page < maxLimit + 1 && page > minLimit) {
            return (
                <button
                    hidden={totalPosts <= postsPerPage}
                    className={
                        page === currentPage
                            ? 'buttonNumActive'
                            : 'buttonNum'
                    }
                    key={index}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            );
        } else return null;
    });

    let pageIncrementBtn = null;

    if (pages.length > maxLimit) {
        pageIncrementBtn = (
            <button
                className='buttonPrevNext'
                onClick={() => {
                    if (currentPage < pages.length) {
                        setCurrentPage(maxLimit + 1);
                        if (currentPage + pageLimit > maxLimit) {
                            setMaxLimit(maxLimit + pageLimit);
                            setMinLimit(minLimit + pageLimit);
                        }
                    }
                }}
            >
                &hellip;
            </button>
        );
    }

    let pageDecrementBtn = null;

    if (pages.length > minLimit) {
        pageDecrementBtn = (
            <button
                className='buttonPrevNext'
                hidden={currentPage < 11}
                onClick={() => {
                    if (currentPage > 1) {
                        setCurrentPage(minLimit);
                        setMaxLimit(maxLimit - pageLimit);
                        setMinLimit(minLimit - pageLimit);
                    }
                }}
            >
                &hellip;
            </button>
        );
    }

    return (
        <div className='pagination'>
            <button
                hidden={totalPosts <= postsPerPage}
                className='buttonPrevNext'
                onClick={() => {
                    if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                        if ((currentPage - 1) % pageLimit === 0) {
                            setMaxLimit(maxLimit - pageLimit);
                            setMinLimit(minLimit - pageLimit);
                        }
                    }
                }}
            >
                {" < "}
            </button>

            {pageDecrementBtn}
            {rederPagination}
            {pageIncrementBtn}

            <button
                hidden={totalPosts <= postsPerPage}
                className='buttonPrevNext'
                onClick={() => {
                    if (currentPage < pages.length) {
                        setCurrentPage(currentPage + 1);
                        if (currentPage + 1 > maxLimit) {
                            setMaxLimit(maxLimit + pageLimit);
                            setMinLimit(minLimit + pageLimit);
                        }
                    }
                }}
            >
                {" > "}
            </button>
        </div>
    );
}