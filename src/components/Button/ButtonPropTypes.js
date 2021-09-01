import PropTypes from 'prop-types'

const ButtonPropTypes = {
    text: PropTypes.string,
    large: PropTypes.bool,
    color: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string
}

export default ButtonPropTypes