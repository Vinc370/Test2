import React from 'react'
import ReactPaginate from "react-paginate";
import { disabled, active } from './Pagination.module.scss'
import { getAllVenuesPaginate } from '../../../../../redux/actions/venue/allVenue'
import { connect } from 'react-redux'

function Pagination({ pageCount, getAllVenuesPaginate, page }) {
    const handlePageChange = data => {
        getAllVenuesPaginate(data.selected + 1, 7)
        window.scrollTo(0, 0)
    }

    return (
        <ReactPaginate 
            pageCount={pageCount}
            onPageChange={data => handlePageChange(data)}
            pageRangeDisplayed={5}
            containerClassName='pagination'
            pageClassName='page-item'
            pageLinkClassName='page-link text-signature'
            previousClassName='page-item'
            nextClassName='page-item'
            previousLinkClassName='page-link text-signature'
            nextLinkClassName='page-link text-signature'
            activeClassName={'active ' + active}
            activeLinkClassName='bg-signature border-0'
            disabledClassName={disabled}
            forcePage={page - 1}
        />
    )
}

const mapStateToProps = state => ({
    page: state.allVenue.page,
})

export default connect(mapStateToProps, {getAllVenuesPaginate})(Pagination)
