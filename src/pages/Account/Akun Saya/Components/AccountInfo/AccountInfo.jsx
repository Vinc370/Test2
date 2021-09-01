import React from 'react'
import { Image } from 'react-bootstrap'
import './AccountInfo.scss'
import { connect } from 'react-redux'
import {link} from "../../../../../sources/Variables";

function AccountInfo({ user }) {
    return (
        <>
            {
                user &&
                    <div className="account-info__container">
                        <Image 
                            src={link + '/img/storage/' + user.image}
                            // style={imageStyle}
                            className="account-image"
                        />
                        <div>
                            <div className="account-name">{user.name}</div>
                            <div className="account-email ">{user.email}</div>
                            <div className="account-phone">{user.phone}</div>
                        </div>
                    </div>
            }
        </>
    )
}

// const imageStyle = {
//     borderRadius: '50%',
//     objectFit: 'cover',
// }

const mapStateToProps = state => ({
    user: state.authentication.currentUser,
})

export default connect(
    mapStateToProps,
    null
)(AccountInfo)
