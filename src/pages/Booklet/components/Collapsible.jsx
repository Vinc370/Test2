import React, { useRef, useState } from 'react'

import './collapsible.scss'

const Collapsible = (props) => {
    const collapseRef = useRef(null)
    const [isCollapseOpen, setIsCollapseOpen] = useState(false)

    return (
        <>
            <div className={`${props.containerClassName || ''} ${isCollapseOpen ? 'collapse-open' : 'collapse-close'}`}>
                {
                    props.header(isCollapseOpen, () => setIsCollapseOpen(prev => !prev))
                }
                <div ref={collapseRef} className="collapsible" style={{'--height': isCollapseOpen ? `${collapseRef.current?.scrollHeight}px` : 0}}>
                    {
                        props.content(isCollapseOpen)
                    }
                </div>
            </div>
        </>
    )
}

export default Collapsible
