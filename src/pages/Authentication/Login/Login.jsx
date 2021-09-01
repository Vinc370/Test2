import React from 'react'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import useWindowSize from '../../../hooks/useWindowSize'
import Desktop from './Desktop/DesktopLogin'
import Mobile from './Mobile/MobileLogin'

function Login() {
    useDocumentTitle('Masuk - Littlecloud');
    const {isMobile, size} = useWindowSize();

    return (
        <>
            {
                isMobile
                    ? <Mobile />
                    : <Desktop />
            }
        </>
    )
}

export default Login
