import React from 'react'
import { connect } from 'react-redux'
import { getFacilityIcon } from './FasilitasIcon'
import './Fasilitas.scss'

function Fasilitas({ className, venue }) {

    const getFacilitiesIcons = () => (
        venue.facility?.map((facility,key) => {
            const Icon = getFacilityIcon(facility)
            return <div key={facility.venue_category_facility.venue_category_id}>
                <div className="icon-container" key={key}>
                    <Icon pathStyle={iconStyle} />
                </div>
                <div className="facility-name text-center mt-2 text-break font-size-6">
                  {facility.venue_category_facility.venue_category_name}
                </div>
            </div>
        })
    )

    return (
        <>
            {   
                venue.facility.length === 0 
                ? <div className="text-center mt-4">This venue has no facilities</div>
                : <div className={`fasilitas-list d-grid grid-gap-2 grid-gap-sm-4 grid-template-col-5 grid-template-col-sm-7 grid-template-col-md-8 ${className}`}>
                    {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
                    {getFacilitiesIcons()}
                </div>
            }
        </>
    )
}

const iconStyle = {
    fill: 'var(--signature)'
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data
})

export default connect(mapStateToProps, null)(Fasilitas)
