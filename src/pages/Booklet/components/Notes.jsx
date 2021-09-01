import React from 'react'

const Notes = (props) => {
    return (
        <>
            <p className="notes-label">
                Catatan Khusus :
            </p>
            <p className="d-none notes_id">{props.notesData.notes_id}</p>
            <p className={"notes editableContent "+ (props.editMode === true ? 'border-bottom':'')}>
                {props.notesData.notes ??
                  <>
                    {props.editMode === true ?
                      '':'Silahkan mengisi catatan khusus'
                    }
                  </>
                }
            </p>
        </>
    )
}

export default Notes