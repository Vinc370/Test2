import React from 'react'
import BasicInput from './BasicInput'
import PropTypes from 'prop-types'
import {FaMinus, FaPlus} from "react-icons/fa";

/**
 * Numerical input component with increment and decrement button
 * @param {Object} props
 * @param {number} props.value             The value of the input
 * @param {function} props.onIncrease   Callback function when increase button is clicked
 * @param {function} props.onDecrease   Callback function when decrease button is clicked
 * @param {function} props.onChange     Callback function when value of the input is changed, callback function accepts one value parameter
 * @param {Object} props.style          Styling of the input
 * @param {string} props.className      className of the input
 * @example 
 * <NumberInputWithButtons
 *      value={value}
 *      onIncrease={onIncrease}
 *      onDecrease={onDecrease}
 *      onChange={onChange}
 * />
 */
function NumberInputWithButtons({ value, onDecrease, onIncrease, onChange, style, className }) {
    return (
        <div className="d-flex align-items-center">
            <button 
                onClick={() => onDecrease()}
                className="text-signature font-weight-bold bg-transparent mx-1"
            >
                <FaMinus size={15}/>
            </button>
            <BasicInput 
                id="guest" 
                type="number" 
                min="1" 
                value={value} 
                style={{
                    width: '4rem',
                    height: '2rem',
                    borderRadius: '5px',
                    ...style,
                }}
                className={`${className} text-center`}
                onChange={e => onChange(e.target.value)}
            />
            <button 
                onClick={() => onIncrease()}
                className="text-signature font-weight-bold bg-transparent mx-1"
            >
                <FaPlus size={15}/>
            </button>
        </div>
    )
}

NumberInputWithButtons.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDecrease: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    className: PropTypes.string
}

export default NumberInputWithButtons
