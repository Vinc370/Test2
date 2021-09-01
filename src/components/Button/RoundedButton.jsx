import React from 'react'
import Button from './Button'
import ButtonPropTypes from './ButtonPropTypes'

/**
 * Button with rounded borders
 * @param {object} props
 * @param {string} props.text           The text inside of the button
 * @param {boolean} props.large         If set to true the button will be slightly larger
 * @param {string} props.color          Color of the button. Must be specified with bootstrap color
 * @param {object} props.style          Additional css in js object to be added into the button
 * @param {string} props.className      Additional classes to be added into the button
 * @param {function} props.onClick      onClick function
 * @param {string} props.type           The type of the button. Default is button
 * @example 
 * <RoundedButton
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
function RoundedButton({ style, ...props }) {
    const _style = {
        ...style,
        borderRadius: '25px',
    }

    return (
        <div className="vendorpopup__button-container" style={_style}>
            <Button {...props}/>
        </div>
    )
}

RoundedButton.propTypes = ButtonPropTypes

export default RoundedButton
