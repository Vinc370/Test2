import React, { useState, useEffect } from 'react'
import SelectionItem from './Components/SelectionItem'
import './SelectionGrid.scss'
import LoadingSpinner from '../../../../../../../../components/LoadingSpinner/LoadingSpinner'

function SelectionGrid({ getID, getName, data, add, remove, filterData }) {
    const [content, setContent] = useState(<LoadingSpinner />)
    const [to, setTO] = useState(null)

    useEffect(() => {
        if (!data || !data.length) {
            return
        }

        const mapData = () => {
            return data.map(d => 
                <SelectionItem 
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
        <div
            className="location-grid-container" 
            style={style}
        >
            {content}
        </div>
    )
}

const style = {
    display: 'grid',
    gap: '0.5rem',
}

export default SelectionGrid
