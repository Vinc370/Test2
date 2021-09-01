import React, { useState, useEffect } from 'react'
import { addAddons, removeAddons } from '../../../../../../../redux/actions/venue/venueDetailData'
import { connect } from 'react-redux'
import { isAddonsAdded } from '../../../../../../../utilities/VenueUtilities'
import styles from './AddOnsItem.module.scss'

function AddOnsItem({ addons, addAddons, removeAddons }) {
    const [active, setActive] = useState(isAddonsAdded(addons).added)

    const onChange = () => {
        setActive(prev => !prev)
    }

    useEffect(() => {
        if (active) {
            addAddons(addons)
        } else {
            removeAddons(addons)
        }
    }, [active, addAddons, removeAddons, addons])

    return (
        <label 
            className={"border border-signature font-weight-bold p-2 p-lg-3 d-flex justify-content-between align-items-center font-size-sm-12 user-select-none " + (active ? styles.activeAddOnsItem : '')}
            style={itemStyle}
            role="button"
        >
            <div className="d-flex align-items-center m-0">
                <input 
                    type="checkbox" 
                    onChange={onChange}
                    checked={active}
                />
                <span className="ml-4 font-size-lg-10">{addons.venue_addons_name}</span>
            </div>
            <span className="font-size-lg-10">+ Rp {addons.venue_addons_price}</span>
        </label>
    )
}

const itemStyle = {
    borderRadius: '12px',
    transition: '0.2s'
}

export default connect(null, {
    addAddons,
    removeAddons,
})(AddOnsItem)
