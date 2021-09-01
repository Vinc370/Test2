import "./ModalContainer.scss"
import { useEffect } from "react"
import { useMounted } from "../../hooks/useMounted"

// interface IProps {
//     children: ReactNode
//     isOpen: boolean
//     background?: string
//     fullScreen?: boolean
//     noPadding?: boolean
//     notCentered?: boolean
//     fullScreenKeyboard?: boolean
//     isNested?: boolean
//     isNestedOpen?: boolean
//     maxWidth?: number
//     close?: () => void
//     containerClassName?: string
//     positionClassname?: string
//     containerMargin?: string
// }

const ModalContainer = ({
    children,
    isOpen,
    fullScreen,
    maxWidth,
    close,
    cardClassName,
}) => {
    const isMounted = useMounted()
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => { document.body.style.overflow = 'auto' }
    }, [isOpen])

    return (
        isMounted ?
        <div className={`modal-wrapper ${ isOpen ? 'open' : 'close' }`}>
            <div className={`modal-container ${fullScreen ? 'fullscreen' : ''}`}>
                <div
                    className='backdrop'
                    onClick={() => {
                        if (typeof close !== 'undefined') {
                            close()
                        }
                    }}
                />
                <div
                    className={`card ${cardClassName} ${ isOpen ? 'open' : '' }`}
                    style={{
                        maxWidth
                    }}    
                >
                    { children }
                </div>
            </div>
        </div>
        : null
    )
}

export default ModalContainer