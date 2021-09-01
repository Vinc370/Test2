import React from 'react'
import SelectionGrid from '../SelectionGrid/SelectionGrid'

function SelectionFilter({ label, ...rest }) {
    return (
        <div className="mb-4">
            <div className="selection-label mb-2 font-size-9">{label}</div>
            <SelectionGrid {...rest} />
        </div>
    )
}

export default SelectionFilter
