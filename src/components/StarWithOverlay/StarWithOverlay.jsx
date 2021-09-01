import React from 'react'
import { FaStar } from 'react-icons/fa'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'

/**
 * Button with rounded borders
 * @param {object} props
 * @param {string} props.placement      Placement of the tooltip. Value is between 'top', 'bottom', 'left' or 'right'
 * @param {string} props.tooltip        The text of the tooltip
 * @param {string} props.className      Additional classes to be added into the star
 * @param {object} props.style          Additional styling to be added into the star
 * @example 
 * <StarWithOverlay
 *      placement="bottom"
 *      tooltip="Star Venue"
 *      className="text-primary"
 *      style={{top: '10px'}}
 * />
 */
function StarWithOverlay({ placement='top', tooltip, className, style }) {
    return (
        <OverlayTrigger
            placement={placement}
            overlay={
                <Tooltip>
                    {tooltip}
                </Tooltip>
            }
        >
            <FaStar 
                className={"text-warning " + className} 
                style={style}
            />
        </OverlayTrigger>
    )
}

StarWithOverlay.propTypes = {
    placement: PropTypes.string,
    tooltip: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default StarWithOverlay