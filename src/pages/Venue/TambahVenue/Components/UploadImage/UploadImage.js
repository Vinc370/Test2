import React, { useState } from 'react'
import { imgContainerStyle, imgStyle } from './UploadImage.module.scss'
import { Form, Image } from 'react-bootstrap'

function UploadImage({ setData, isLoading }) {
    const [images, setImages] = useState([])

    const changeFile = e => {
        const fileObj = e.target.files
        setData(data => ({
            ...data,
            images: fileObj,
        }))
        
        const fileArray = []
        for (let i = 0; i < fileObj.length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[i]))
        }
        setImages(fileArray)
    }

    return (
        <>
            <Form.Group className="d-flex">
                <div className="d-flex align-items-center w-50 w-lg-25">
                    <Form.Label className="w-100">
                        Upload Foto (min 1)
                    </Form.Label>
                    <span className="mr-4">: </span>
                </div>
                <div className="w-100">
                    <Form.Label htmlFor="image-file">
                        <div
                            role="button"
                            disabled={isLoading}
                            className="btn btn-dark rounded-0 px-4 px-lg-6 font-size-7 font-size-lg-8"
                        >
                            Upload
                        </div>
                    </Form.Label>
                    <Form.Control 
                        type="file" 
                        className="d-none"
                        id="image-file"
                        accept="image/*"
                        onChange={e => changeFile(e)}
                            disabled={isLoading}
                        multiple
                    />
                </div>
            </Form.Group>

            <div className="w-100 d-grid grid-template-col-3 grid-template-col-md-4 grid-template-col-lg-5 grid-gap-1 grid-gap-md-2 grid-gap-lg-3 mt-4 mt-lg-5">
                {
                    images?.map((url,key) =>
                        <div 
                            className={"position-relative " + imgContainerStyle}
                            key={url}
                        >
                            <Image 
                                src={url}
                                key={key}
                                className={"rounded w-100 h-100 position-absolute " + imgStyle}
                            />
                        </div>    
                    )
                }
            </div>
        </>
    )
}

export default UploadImage
