import React from 'react'
import { Button as Btn } from 'react-bootstrap'
import ButtonPropTypes from './ButtonPropTypes'

/**
 * Basic button component
 * @param {object} props
 * @param {string} props.text           The text inside of the button
 * @param {boolean} props.large         If set to true the button will be slightly larger
 * @param {string} props.color          Color of the button. Must be specified with bootstrap color
 * @param {object} props.style          Additional css in js object to be added into the button
 * @param {string} props.className      Additional classes to be added into the button
 * @param {function} props.onClick      onClick function
 * @example 
 * <Button
 *      text="Submit"
 *      large
 *      color="primary"
 *      style={
 *         borderRadius: '10px' 
 *      }
 *      className="mx-5 py-2"
 *      onClick={doSomething}
 *      type="submit"
 * />
 */
function Button({ 
    text='Button', 
    large=false, 
    color, 
    style={
        padding: '0.9375rem',
        borderRadius: '0.625rem',
        fontWeight: '600',
        fontSize: '1.125rem',
        lineHeight: '1.375rem'
    }, 
    className,
    ...props
}) {
    return (
        <Btn 
            className={[
                'btn',
                large && 'btn-lg',
                `btn-${color}`,
                className,
            ]}
            style={{...style}}
            { ...props }
        >
            { text }
        </Btn>
    )
}

Button.propTypes = ButtonPropTypes

export default Button