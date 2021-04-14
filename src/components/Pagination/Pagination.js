import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.module.scss';
import { PropTypes } from 'prop-types';

function Pagination({ handlePageClick, pageCount, startPage, removedPages, forcePage }) {
	const ariaLabelBuilder = useCallback(
		(pageIndex) => {
			if (removedPages) {
				if (removedPages && removedPages.includes(pageIndex - 1)) {
					return `disabled`;
				}
				return `active`;
			}
		},
		[removedPages]
	);

	return (
		<ReactPaginate
			previousLabel={'<'}
			nextLabel={'>'}
			breakLabel={'...'}
			pageCount={pageCount}
			initialPage={startPage}
			marginPagesDisplayed={2}
			pageRangeDisplayed={3}
			onPageChange={handlePageClick}
			breakClassName={classes.break}
			containerClassName={classes.pagination}
			activeClassName={classes.activePage}
			activeLinkClassName={classes.activeLink}
			ariaLabelBuilder={ariaLabelBuilder}
			forcePage={forcePage}
		/>
	);
}

Pagination.propTypes = {
	handlePageClick: PropTypes.func.isRequired,
	pageCount: PropTypes.number.isRequired,
	startPage: PropTypes.number.isRequired,
	forcePage: PropTypes.number,
	removedPages: PropTypes.arrayOf(PropTypes.number),
};

export default React.memo(Pagination);
