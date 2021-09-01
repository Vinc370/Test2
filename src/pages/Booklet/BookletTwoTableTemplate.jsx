import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CircleAdd from '../../assets/icons/CircleAdd'
import DeleteIcon from '../../assets/icons/DeleteIcon'
import useWindowSize from '../../hooks/useWindowSize'
import './booklet.scss'
import BookletButton from './components/BookletButtons'
import Notes from './components/Notes'

const BookletTwoTableTemplate = ({event_id, getData, storeData, detail, detailTitle, type, category}) => {
    const history = useHistory()
    const {isMobile, size} = useWindowSize();

    const [editMode, setEditMode] = useState(false)
    const [dataNew, setDataNew] = useState([[],[]])
    const [booklet, setBooklet] = useState({
        notes_id: '',
        notes: ''
    })

    useEffect(() => {
        loadPage()
    }, [])

    useEffect(() => {
        tableEditable(editMode)
    }, [dataNew])

    function getBookletData() {
        const id = document.querySelector('.notes_id')?.textContent
        const notes = document.querySelector('.notes')?.textContent

        return {id, notes}
    }

    function getDetailsData() {
        const getDataElements = []

        for (let i = 0; i < category.length; i++) {
            getDataElements.push(...getDataElement(i))
        }

        return getDataElements
    }

    function setDetailsDataBySide(ids, fillDetail, type) {
        const listData = []
        
        for (let index = 0; index < ids.length; index++) {
            let detailData = {};
            detailData["id"] = ids[index].dataset.key;
            detailData["type"] = type;

            detail.forEach((d, k) => {
                detailData[d] = fillDetail[k][index]?.textContent;
            });

            listData.push(detailData)
        }

        return listData
    }

    function getDataElement(num) {
        const ids = document.querySelectorAll(`.data${num}Data[data-key]`);
        let fillDetail = {};

        detail.forEach((d, k) => {   
            fillDetail[k] = document.querySelectorAll(`.${d}${num}Form`);
        });

        return setDetailsDataBySide(ids, fillDetail, category[num])
    }

    async function saveData() {
        const finalData = {
            ...getBookletData(),
            details: getDetailsData()
        }
        
        try {
            setLoading()
            await storeData(event_id, finalData)
            loadPage()
        } catch (error) {
            if (error.response.status === 401) {
                history.push('/login')
            }
        }
    }

    function enterEditMode() {
        setEditMode(true)
        tableEditable(true)
    }

    function tableEditable(flag){
        const contents = document.querySelectorAll('.editableContent')
        contents.forEach(content => {
            if(flag) content.setAttribute('contenteditable', 'true')
            else content.removeAttribute('contenteditable')
        })
    }

    function outEditMode() {
        setEditMode(false)
        tableEditable(false)
        saveData()
    }

    async function getAndSetData() {
        const responseData = await getData(event_id)
        const bookletData = responseData.data.booklet
        const dataList = responseData.data[type.plural]
        
        setBooklet({
            notes_id: bookletData.notes_id,
            notes: bookletData.notes,
        })

        setDataList(dataList)
    }

    function setDataList(dataList) {
        const dataNewList = []

        for (let i = 0; i < category.length; i++) {
            dataNewList[i] = [];
        }

        dataList.forEach(d => {
            dataNewList[category.indexOf(d.type)].push(d)
        })
        
        for (let i = 0; i < category.length; i++) {
            setDataNew((prevState) => ({
                ...prevState,
                [i]: dataNewList[i]
            }))
        }
    }

    function setDetailData(idText, otherText, typeText) {
        let detailData = {};
        detailData["id"] = idText;

        detail.forEach(d => {
            detailData[d] = otherText;
        });

        detailData["type"] = typeText;

        return detailData;
    }

    function setLoading() {
        setBooklet({
            notes: 'Loading...'
        })

        for (let i = 0; i < category.length; i++) {
            setDataNew((prevState) => ({
                ...prevState,
                [i]: [setDetailData('Loading...', 'Loading...', 'Loading...')]
            }))
        }
    }

    function loadPage() {
        setLoading()
        getAndSetData()
    }

    function generatePDF() {
        const doc = new jsPDF()
        doc.text(`Booklet ${type.indonesian}`, 15, 12)

        for (let i = 0; i < category.length; i++) {
            if(i===0) doc.autoTable({html: `#data${i}Table`, margin: {top: 20}});
            else doc.autoTable({html: `#data${i}Table`});
        }

        doc.save(`Booklet ${type.indonesian}.pdf`)
    }

    const addData = (side) => {
        setDataNew((prevState) => ({
            ...prevState,
            [category.indexOf(side)]: prevState[category.indexOf(side)].concat(setDetailData('0', '', side))
        }))
    }

    const deleteData = (side, idx) => {
        setDataNew((prevState) => ({
            ...prevState,
            [category.indexOf(side)]: prevState[category.indexOf(side)].filter((_, k) => k !== idx)
        }))
    }

    return (
        <>
            <div className="booklet-content">
                <div className="content">
                    <div className="title-and-button">
                        <p className="title d-desktop">
                            {type.indonesian}
                        </p>
                        <BookletButton editMode={editMode} enterEditMode={enterEditMode} outEditMode={outEditMode} generatePDF={generatePDF} />
                    </div>
                    <Notes notesData={booklet} editMode={editMode}/>
                    {
                        category?.map((c, key_c) => (
                            <>
                                {
                                    !isMobile ? 
                                        <table className="booklet-table mt-3 border-top-0">
                                            <thead>
                                                <tr>
                                                    <th colSpan={editMode ? (detail.length+1) : detail.length}>{c}</th>
                                                </tr>
                                                <tr>
                                                    {
                                                        detailTitle?.map((dt, k) => (
                                                            <th height="40" key={k}>
                                                                {dt}
                                                            </th>
                                                        ))
                                                    }
                                                    {
                                                        editMode &&
                                                        <th height="40"></th>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dataNew[key_c].map((data, k) => (
                                                        <tr key={k} className={`data${key_c}Form data${key_c}Data`} data-key={data.id}>
                                                            {
                                                                detail?.map((det, k2) => (
                                                                    <td height="40" key={k2} className={`${det}${key_c}Form editableContent`}>{data[det]}</td>
                                                                ))
                                                            }
                                                            {
                                                                editMode &&
                                                                <td height="40">
                                                                    <button onClick={() => deleteData(c, k)} className="delete-button">
                                                                        <DeleteIcon className="delete-icon" />
                                                                    </button>
                                                                </td>
                                                            }
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    : 
                                    <>
                                        <p className="text-grey-soft">{c}</p>
                                        {
                                            dataNew[key_c].length === 0 ? 
                                            <p>Belum ada data</p>
                                            :
                                            dataNew[key_c].map((data, k) => (
                                                <div key={k}>
                                                    <p className="font-weight-bold d-flex justify-content-between">
                                                        {"Data "+(k+1)}
                                                        {
                                                            editMode &&
                                                            <button onClick={() => deleteData(c, k)} className="delete-button">
                                                                <DeleteIcon className="delete-icon" />
                                                            </button>
                                                        }
                                                    </p>
                                                    <table className={`booklet-table data${key_c}Data`} data-key={data.id}>
                                                        <thead>
                                                            {
                                                                detailTitle?.map((title, k2) => (
                                                                    <tr key={k2}>
                                                                        <th>
                                                                            {title}
                                                                        </th>
                                                                        <td className={`${detail[k2]}${key_c}Form editableContent`}>
                                                                            {data[detail[k2]]}
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </thead>
                                                    </table>
                                                </div>
                                            ))
                                        }
                                    </>
                                }
                                {
                                    editMode &&
                                    <button onClick={()=>addData(c)} className="add-button">
                                        <CircleAdd className="add-icon" /> Tambah
                                    </button>
                                }
                            </>
                        ))
                    }

                    {
                        category?.map((c, key_c) => (
                            <>
                                <table id={`data${key_c}Table`} className="d-none">
                                    <thead>
                                        <tr>
                                            <th colSpan={editMode ? (detail.length+1) : detail.length}>{c}</th>
                                        </tr>
                                        <tr>
                                            {
                                                detailTitle?.map((dt, k) => (
                                                    <th height="40" key={k}>
                                                        {dt}
                                                    </th>
                                                ))
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataNew[key_c].map((data, k) => (
                                                <tr key={k}>
                                                    {
                                                        detail?.map((det, k2) => (
                                                            <td key={k2}>{data[det]}</td>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>      
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default BookletTwoTableTemplate