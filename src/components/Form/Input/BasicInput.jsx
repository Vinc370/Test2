import React from 'react'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'
import { DebounceInput } from 'react-debounce-input'

const borderSides = ['left', 'top', 'right', 'bottom']

/**
 * Basic input component
 * @param {object} props
 * @param {string} props.id           The id of the input
 * @param {string} props.type         The type of the form control, default is text
 * @param {string[]} props.border     The input's borders, default is ['left', 'top', 'right', 'bottom']
 * @param {string} props.className    The className for the input
 * @param {any} props.value           The controlled value for the input
 * @param {onChange} props.onChange   The function to call when value changed
 * @example 
 * <BasicInput
 *      id="username"
 *      type="text"
 *      border={['bottom']}
 *      value={email}
 *      onChange={changeEmail}
 * />
 */
function BasicInput({
    id,
    type='text',
    border=borderSides,
    className,
    ...props
}) {
    const getBorderClassName = () => {
        return borderSides
                .filter(side => !border.includes(side))
                .map(side => `border-${side}-0`)
                .join(' ')
    }

    const borderClass = getBorderClassName()

    return (
        // <FormControl 
        //     id={id}
        //     type={type}
        //     {...props}
        //     className={`${className} ${borderClass} shadow-none border-focus-signature ${border.length === 1 ? 'rounded-0' : ''}` }
        // />
        <DebounceInput 
            id={id}
            type={type}
            {...props}
            className={`${className} ${borderClass} form-control shadow-none border-focus-signature ${border.length === 1 ? 'rounded-0' : ''}`}
            debounceTimeout={300}
        />
    )
}

BasicInput.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    border: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default BasicInput