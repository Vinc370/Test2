import React from 'react'
import { connect } from 'react-redux'
import AddOnsItem from './components/addOnsItem/AddOnsItem'

function AddOns({ venue }) {

    return (
        <>
            <div className="d-grid grid-gap-1">
                {
                    !venue.venue_addons.length
                        &&
                        <div className="text-center">This venue has no addons</div>
                }
                {
                    venue.venue_addons
                        &&
                        venue.venue_addons?.map(addons =>
                            <AddOnsItem 
                                key={addons.venue_addons_id}
                                addons={addons}     
                            />
                        )
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data
})

export default connect(mapStateToProps, null)(AddOns)
