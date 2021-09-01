import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { MAX_PRICE_PER_PAX } from '../../../../../../../../constants/VenueFilterConstants'
import { getAllVenuesPaginate } from '../../../../../../../../redux/actions/venue/allVenue'
import {changePaxPriceMax, changePaxPriceMin,changePaxPriceRange} from '../../../../../../../../redux/actions/venue/venueFilter'
import './HargaPerPax.scss'


function HargaPerPax({ title, paxPriceRange, changePaxPriceMin, changePaxPriceMax, changePaxPriceRange, getAllVenuesPaginate }) {
    const [timeout, setTO] = useState(null)
    const [priceRange, setPriceRange] = useState(paxPriceRange)
    
    const onChangePriceMin = async e => {
        setPriceRange(prev => ({
            ...prev,
            min: e.target.value,
        }))

        await changePaxPriceMin(e.target.value)
        getAllVenuesPaginate()
    }

    const onChangePriceMax = async e => {
        setPriceRange(prev => ({
            ...prev,
            max: e.target.value,
        }))

        await changePaxPriceMax(e.target.value)
        getAllVenuesPaginate()
    }

    const onChangePriceRange = async value => {
        setPriceRange({
            min: value[0],
            max: value[1],
        })

        if (timeout) {
            clearTimeout(timeout)
        }

        setTO(setTimeout(async () => {
            await changePaxPriceRange(value)
            getAllVenuesPaginate()
        }, 300))
    }

    return (
        <div className="harga-per-pax mb-4">
            <div className="harga-per-pax__label mb-2 font-size-10">{title || 'Harga per Pax :'}</div>
            <div className="harga-per-pax__container">
                <div className="harga-per-pax__price-range d-flex justify-content-center pb-3 align-items-center">
                    <p className="">
                        Rp. {priceRange.min} - Rp. {priceRange.max}
                    </p>
                    {/* <div className="position-relative">
                        <span style={rpStyle}>Rp. </span>
                        <BasicInput 
                            id="min-price" 
                            type="number"
                            className="text-center"
                            style={inputStyle}
                            value={priceRange.min}
                            step={10000}
                            min={100000}
                            max={MAX_PRICE_PER_PAX}
                            onChange={e => onChangePriceMin(e)}
                        />
                    </div>
                    <div
                        className="bg-secondary mx-2" 
                        style={dividerStyle} 
                    />
                    
                    <div className="position-relative">
                        <span style={rpStyle}>Rp. </span>
                        <BasicInput 
                            id="max-price" 
                            type="number"
                            className="text-center"
                            style={inputStyle}
                            value={priceRange.max}
                            step={10000}
                            min={100000}
                            max={MAX_PRICE_PER_PAX}
                            onChange={e => onChangePriceMax(e)}
                        />
                    </div> */}
                </div>
                <div className="harga-per-pax__slider-container">
                    <Range
                        allowCross={false}
                        min={100000} 
                        max={MAX_PRICE_PER_PAX}
                        step={10000}
                        value={[priceRange.min, priceRange.max]}
                        onChange={value => onChangePriceRange(value)}
                        handleStyle={[handleStyle, handleStyle]}
                        railStyle={railStyle}
                        trackStyle={[trackStyle]}
                    />
                </div>
            </div>
        </div>
    )
}

const rpStyle = {
    position: 'absolute',
    top: '50%',
    left: '15px',
    transform: 'translateY(-50%)'
}

const inputStyle = {
    height: '1.5rem',
    width: '7rem',
    fontSize: '0.75rem'
}

const handleStyle = {
    width: '24px',
    height: '24px',
    marginTop: '-11px',
    backgroundColor: 'var(--signature)',
    border: 'none',
}

const dividerStyle = {
    width: '25px',
    height: '1px'
}

const railStyle = {
    height: '2px',
}

const trackStyle = {
    backgroundColor: 'var(--signature)',
    height: '2px',
}

const mapStateToProps = state => ({
    paxPriceRange: state.venueFilter.paxPriceRange
})

export default connect(
    mapStateToProps,
    {
        changePaxPriceMin,
        changePaxPriceMax,
        changePaxPriceRange,
        getAllVenuesPaginate,
    }
)(HargaPerPax)