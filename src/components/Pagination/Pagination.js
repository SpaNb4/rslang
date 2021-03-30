import React from 'react';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.module.scss';
import { PropTypes } from 'prop-types';

function Pagination({ handlePageClick, pageCount, startPage, removedPages }) {
	function ariaLabelBuilder(pageIndex) {
		if (removedPages && removedPages.includes(pageIndex)) {
			return 'disabled';
		}
		return 'active';
	}

	return (
		<ReactPaginate
			previousLabel={'<'}
			nextLabel={'>'}
			breakLabel={'...'}
			pageCount={pageCount}
			initialPage={startPage}
			marginPagesDisplayed={2}
			pageRangeDisplayed={5}
			onPageChange={handlePageClick}
			breakClassName={classes.break}
			containerClassName={classes.pagination}
			activeClassName={classes.activePage}
			activeLinkClassName={classes.activeLink}
			ariaLabelBuilder={ariaLabelBuilder}
		/>
	);
}

Pagination.propTypes = {
	handlePageClick: PropTypes.func.isRequired,
	pageCount: PropTypes.number.isRequired,
	startPage: PropTypes.number.isRequired,
	removedPages: PropTypes.arrayOf(PropTypes.number),
};

export default Pagination;
