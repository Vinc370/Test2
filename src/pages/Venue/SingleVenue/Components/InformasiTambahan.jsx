import React from 'react'
import { connect } from 'react-redux'
import './InformasiTambahan.scss'

function InformasiTambahan({ venue, className }) {
    return (
        <div className={`informasi-tambahan-container ${className || ''}`}>
            <div className="section-title__primary informasi-tambahan-title">
                Informasi Tambahan
            </div>
            <div className="informasi-tambahan-detail__container">
                {
                    venue.venue_additional_information?.map((item, index) =>
                        <div key={index} className="informasi-tambahan-detail__item">
                            <p className="informasi-tambahan-detail-label">
                                {item.venue_additional_information_title}
                            </p>
                            <p className="informasi-tambahan-detail-content">
                                {item.venue_additional_information_content}
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data
})

export default connect(mapStateToProps, null)(InformasiTambahan)