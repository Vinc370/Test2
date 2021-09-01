import React, { useEffect, useState } from 'react'
import FilterItem from './Components/FilterItem'
import LoadingSpinner from '../../../../../../../../components/LoadingSpinner/LoadingSpinner'
import './CheckboxFilter.scss'

function CheckboxFilter({ getID, getName, label, data, add, remove, filterData }) {
    const [content, setContent] = useState(<LoadingSpinner />)
    const [to, setTO] = useState(null)

    useEffect(() => {
        if (!data || !data.length) {
            return
        }

        const mapData = () => {
            return data.map(d => 
                <FilterItem 
                    key={d.venue_one_category_id} 
                    id={getID(d)}
                    name={getName(d)}
                    to={to}
                    setTO={setTO}
                    add={add}
                    remove={remove}
                    filterData={filterData}
                />
            )
        }

        setContent(mapData())
    }, [data, add, remove, filterData, getID, getName, to, setTO])

    return (
        <div className="checkbox-filter-container">
            <h5 
                className="font-weight-bold mb-3"
                style={categoryStyle}
            >
                {label}
            </h5>
            <div className="d-grid">
                {content}
            </div>
        </div>
    )
}

const categoryStyle = {
    fontSize: '1rem'
}

export default CheckboxFilter
