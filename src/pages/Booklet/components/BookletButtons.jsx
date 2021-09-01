import React from 'react'

const BookletButton = ({ editMode, enterEditMode, outEditMode, generatePDF }) => {
    return (
        <>
            <button className="button-pdf" onClick={generatePDF}>
                Unduh PDF
            </button>
            {!editMode ?
                <button className="button-edit" onClick={enterEditMode}>
                    Edit
                </button>
                :
                <button className="button-edit" onClick={outEditMode}>
                    Save
                </button>
            }
        </>
    )
}

export default BookletButton