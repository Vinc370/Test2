import React from 'react'
import BasicInput from '../../../../../../../../components/Form/Input/BasicInput'
import { connect } from 'react-redux'
import { 
    changePaxPriceMin,
    changePaxPriceMax
} from '../../../../../../../../redux/actions/venue/venueFilter'
import { getAllVenuesPaginate } from '../../../../../../../../redux/actions/venue/allVenue'
import { MAX_PRICE_PER_PAX } from '../../../../../../../../constants/VenueFilterConstants'

function RentangHarga({ paxPriceRange, changePaxPriceMin, changePaxPriceMax, getAllVenuesPaginate }) {
    const onChangeMax = async e => {
        await changePaxPriceMax(parseInt(e.target.value))
        getAllVenuesPaginate()
    }

    const onChangeMin = async e => {
        await changePaxPriceMin(parseInt(e.target.value))
        getAllVenuesPaginate()
    }

    return (
        <div>
            <h5 
                className="font-weight-bold mb-4"
                style={categoryStyle}
            >
                Rentang Harga
            </h5>
            <div className="d-flex align-items-center mb-3">
                <span 
                    className="mr-3"
                    style={spanStyle}
                >
                    Min
                </span>
                <BasicInput 
                    className="rounded" 
                    type="number"
                    style={inputStyle}
                    step={10000}
                    min={100000}
                    max={MAX_PRICE_PER_PAX}
                    value={paxPriceRange.min}
                    onChange={e => onChangeMin(e)}
                />
            </div>
            <div className="d-flex align-items-center">
                <span 
                    className="mr-3"
                    style={spanStyle}
                >
                    Max
                </span>
                <BasicInput 
                    className="rounded" 
                    type="number"
                    style={inputStyle}
                    step={10000}
                    min={100000}
                    max={MAX_PRICE_PER_PAX}
                    value={paxPriceRange.max}
                    onChange={e => onChangeMax(e)}
                />
            </div>
        </div>
    )
}

const spanStyle = {
    width: '3rem'
}

const categoryStyle = {
    fontSize: '1rem'
}

const inputStyle = {
    width: '50%'
}

const mapStateToProps = state => ({
    paxPriceRange: state.venueFilter.paxPriceRange,
})

export default connect(
    mapStateToProps,
    {
        changePaxPriceMin,
        changePaxPriceMax,
        getAllVenuesPaginate,
    }
)(RentangHarga)
