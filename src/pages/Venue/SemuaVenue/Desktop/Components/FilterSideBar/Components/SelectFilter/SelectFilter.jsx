import React from 'react'
import RightArrowBold from '../../../../../../../../assets/icons/RightArrowBold'
import './SelectFilter.scss'

const SelectFilter = ({
    title,
    value,
    onChange, // (e: React.ChangeEvent<HTMLSelectElement>) => {}
    children, // multiple <option>
    containerClassName, // optional, string
}) => {
    return (
        <div className={`select-filter-container ${containerClassName || ''}`}>
            <h5 className="title">
                {title}
            </h5>
            <div className="select-container">
                <select
                    value={value}
                    onChange={onChange}
                    className="select"
                >
                    {children}
                </select>
                <RightArrowBold className="icon" />
            </div>
        </div>
    )
}

export default SelectFilter