import React from 'react'
import { connect } from 'react-redux'

function Referral({ className, currentUser }) {
    return (
        <>
            {
                currentUser &&
                    <div className={`${className} d-flex flex-column align-items-center font-weight-bold`}>
                        <div className="font-size-7 mb-1">Referral Code :</div>
                        <div className="pb-3 px-4 border-bottom border-2">
                            {currentUser.referral_code === ""
                                ?
                                <p className='small'>Lakukan transaksi terlebih dahulu untuk mendapatkan referral code anda</p>
                                :
                                <p>{currentUser.referral_code}</p>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

const mapStateToProps = state => ({
    currentUser: state.authentication.currentUser
})

export default connect(
    mapStateToProps,
    null
)(Referral)
