import React from 'react'
import AccountInfo from '../Components/AccountInfo/AccountInfo'
import Buttons from '../Components/Buttons/Buttons'
import { connect } from 'react-redux'
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";

function AkunSayaDesktop({ currentUser }) {
    return (
        <>
            {
                currentUser &&
                    <div>
                        <Header/>
                        <div className="mt-4">
                            <AccountInfo />
                        </div>
                        <div className="w-50 p-5">
                            <div className="font-weight-bold d-flex align-items-center mb-6">
                                <span className="mr-4 font-size-9">Referral Code: </span>
                                <span className="font-size-9">
                                    {currentUser.referral_code === ""
                                        ?
                                        <p className='m-0'>Lakukan transaksi terlebih dahulu</p>
                                        :
                                        <p className='m-0'>{currentUser.referral_code}</p>
                                    }
                                </span>
                            </div>

                            <Buttons />
                        </div>
                    </div>
            }
        </>
    )
}

const mapStateToProps = state => ({
    currentUser: state.authentication.currentUser
})

export default connect(mapStateToProps, null)(AkunSayaDesktop)
