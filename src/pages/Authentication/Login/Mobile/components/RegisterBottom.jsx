import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function RegisterBottom() {
    return (
        <Container style={registerBottomStyle} fluid className="bg-signature text-white text-center py-3 position-fixed">
            <span>
                Belum punya akun? <Link to="/register" className="text-white">
                    <u>
                        Daftar sekarang
                    </u>
                </Link>
            </span>
        </Container>
    )
}

const registerBottomStyle={
  bottom:0
}

export default RegisterBottom
