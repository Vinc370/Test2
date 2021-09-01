import React from 'react'
import { Link } from 'react-router-dom'

import './DesktopAccountSidebar.scss'

const DesktopAccountSidebar = ({
    active, // profile | voucher-saya | tagihan | bantuan | quoatation-saya | transaksi
}) => {
    return (
        <div className="desktop-account-sidebar">
            <Link to='/akun' className={`item ${active === 'profile' ? 'active' : ''}`}>
                Profile
            </Link>
            <Link to='/transaksi/menunggu-pembayaran' className={`item ${active === 'transaksi' ? 'active' : ''}`}>
                Transaksi
            </Link>
            <a href="/company/faq" target="_blank" rel="noopener noreferrer" className={`item ${active === 'bantuan' ? 'active' : ''}`}>
                Bantuan
            </a>
        </div>
    )
}

export default DesktopAccountSidebar