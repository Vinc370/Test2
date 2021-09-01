import React, { useRef, useState } from 'react'
import { getAllVenuesPaginate } from '../../../../../../../../../redux/actions/venue/allVenue'
import { connect } from 'react-redux'

import './FilterItem.scss'
import CheckMarkIcon from '../../../../../../../../../assets/icons/CheckMarkIcon'

function FilterItem({ id, name, add, remove, filterData, getAllVenuesPaginate, to, setTO }) {
    const inputRef = useRef(null)

    const isAdded = () => {
        if (filterData.includes(id)) {
            return true
        }
        return false
    }
    
    const [checked, setChecked] = useState(isAdded())

    const onChange = () => {
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
        <div onClick={() => inputRef.current?.click()} className="filter-item">
            <span className={`box ${checked ? 'checked' : ''}`}>
                <CheckMarkIcon className="icon" />
            </span>
            <span 
                className="label"
            >
                {name}
            </span>
            <input 
                ref={inputRef}
                type="checkbox" 
                // style={checkboxStyle} 
                checked={checked}
                onChange={_ => onChange()}
            />
        </div>
    )
}

const checkboxStyle = {
    transform: 'scale(1.5)'
}

const labelStyle = {
    fontSize: '0.9rem'
}

export default connect(null, {getAllVenuesPaginate})(FilterItem)
