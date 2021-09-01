import React, { useState } from 'react'
import { getAllVenuesPaginate } from '../../../../../../../../../redux/actions/venue/allVenue'
import { connect } from 'react-redux'

function SelectionItem({ id, name, add, remove, filterData, getAllVenuesPaginate, to, setTO }) {
    const isAdded = () => {
        if (filterData.includes(id)) {
            return true
        }
        return false
    }
    
    const [checked, setChecked] = useState(isAdded())

    const onClick = () => {
        const change = async () => {
            if (!checked) {
                await add(id)
            } else {
                await remove(id)
            }
            
            if (to) {
                clearTimeout(to)
            }
            
            setTO(setTimeout(async () => {
                getAllVenuesPaginate()
            }, 400))
        }

        setChecked(prev => !prev)
        change()
    }

    return (
        <button 
            className={`location-option py-1 rounded ${checked ? 'location-option__active' : ''}`}
            // style={checked ? checkedStyle : normalStyle}
            onClick={() => onClick()}
        >
            {name}
        </button>
    )
}

const normalStyle = {
    fontSize: '0.5rem'
}

const checkedStyle = {
    fontSize: '0.5rem',
    backgroundColor: 'var(--signature)',
    color: 'white',
}

export default connect(null, {getAllVenuesPaginate})(SelectionItem)
