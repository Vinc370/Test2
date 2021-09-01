import React from 'react'
import NumberInputWithButtons from '../../../../../../../../components/Form/Input/NumberInputWithButtons'
import { connect } from 'react-redux'
import { 
    increaseGuestCount,
    decreaseGuestCount,
    changeGuestCount,
} from '../../../../../../../../redux/actions/venue/venueFilter'
import { getAllVenuesPaginate } from '../../../../../../../../redux/actions/venue/allVenue'

function JumlahTamu({ guestCount, className, increaseGuestCount, decreaseGuestCount, changeGuestCount, getAllVenuesPaginate }) {
    
    // TODO: fetch only when some time has passed

    const onDecrease = async value => {
        await decreaseGuestCount(value)
        getAllVenuesPaginate()
    }

    const onIncrease = async value => {
        await increaseGuestCount(value)
        getAllVenuesPaginate()
    }

    const onChange = async value => {
        await changeGuestCount(value)
        getAllVenuesPaginate()
    }

    return (
        <div className={`${className} d-flex align-items-center`}>
            {/* kena global css waktu breakpoint mobile */}
            <span className="mr-3 font-size-9">Jumlah Tamu :</span>
            <NumberInputWithButtons 
                value={guestCount}
                onDecrease={value => onDecrease(value)}
                onIncrease={value => onIncrease(value)}
                onChange={value => onChange(value)}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    guestCount: state.venueFilter.guestCount
})

export default connect(
    mapStateToProps, 
    {
        increaseGuestCount,
        decreaseGuestCount,
        changeGuestCount,
        getAllVenuesPaginate,
    }
)(JumlahTamu)