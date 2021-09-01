import React from 'react'
import { connect } from 'react-redux'
import BasicInput from '../../../../../../../../components/Form/Input/BasicInput'
import { changeGuestCount } from '../../../../../../../../redux/actions/venue/venueFilter'
import { getAllVenuesPaginate } from '../../../../../../../../redux/actions/venue/allVenue'

function JumlahTamu({ guestCount, changeGuestCount, getAllVenuesPaginate }) {
    const onChange = async e => {
        await changeGuestCount(e.target.value)
        getAllVenuesPaginate()
    }

    return (
        <div className="d-flex align-items-center">
            <h5 
                className="font-weight-bold mr-4"
                style={categoryStyle}
            >
                Jumlah Tamu
            </h5>
            <div className="d-flex align-items-center">
                <BasicInput 
                    id="guest" 
                    type="number" 
                    min="1" 
                    value={guestCount} 
                    style={inputStyle}
                    className="text-center"
                    onChange={e => onChange(e)}
                />
            </div>
        </div>
    )
}

const inputStyle = {
    width: '4rem',
    height: '2rem',
    borderRadius: '5px'
}

const categoryStyle = {
    fontSize: '1rem'
}

const mapStateToProps = state => ({
    guestCount: state.venueFilter.guestCount
})

export default connect(mapStateToProps, { 
    changeGuestCount,
    getAllVenuesPaginate,
})(JumlahTamu)
