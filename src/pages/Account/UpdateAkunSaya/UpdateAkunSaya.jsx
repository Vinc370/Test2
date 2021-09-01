import React, { useEffect, useRef, useState } from 'react';
import { Form, FormGroup, FormLabel, Image } from "react-bootstrap";
import { connect } from 'react-redux';
import CameraIcon from '../../../assets/icons/CameraIcon';
import RoundedButton from "../../../components/Button/RoundedButton";
import BasicInput from "../../../components/Form/Input/BasicInput";
import useWindowSize from '../../../hooks/useWindowSize';
import { updateProfile } from '../../../services/AuthService';
import UrlService from '../../../services/UrlService';
import AccountMain from '../AccountMain/AccountMain';
import './UpdateAkunSaya.scss';

function UpdateAkunSaya({ user }) {
  const [isLoading, setIsLoading] = useState(false)
  const {isMobile, size} = useWindowSize();

  const uploadRef = useRef(null);
  
  const [data, setData] = useState(null)

  useEffect(() => {
    setData({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      picture: {
        type: 'dummy',
        path: user?.image,
        image: user?.image
      }  
    })
  }, [user])


  const [error_label, setErrorLabel] = useState(null);

  const onChange = e => {
    setData(prevData => ({
        ...prevData,
        [e.target.name]: e.target.value
    }))
}

  const uploadFile =(e)=>{
    const fileObj = e.target.files[0]
    const imageObject = URL.createObjectURL(fileObj)

    setData(prevData => ({
      ...prevData,
      picture: {
        type: 'user',
        path: imageObject,
        image: fileObj
      }
    }))
  }

  const onSubmit = async e => {
    setIsLoading(true)

    e.preventDefault()
    try{
      var bodyFormData = new FormData();
      bodyFormData.set('name', data?.name);
      bodyFormData.set('email', data?.email);
      bodyFormData.set('phone', data?.phone);

      if (data?.picture.type === 'user') bodyFormData.append('image', data?.picture.image);
			else bodyFormData.set('image', data?.picture.image);

      await updateProfile(bodyFormData);
    } catch(err){
      setErrorLabel(err.response.data?.errors)
    }

    setIsLoading(false)
};

  return (
    <>
      {
        !isLoading &&

        <AccountMain
          title='Akun Saya'
          sidebar='profile'
          item={
            <>
                <div className='right-container w-100'>
                  <div className='container-keranjang general-desktop-container '>
                    <div className='align-horizontally'>
                      <div className={`w-100 ${isMobile ? '' : 'p-4-5'}`}>
                        <p className="d-desktop profile-title">
                          Profile
                        </p>
                        <div className="form-image">
                          {data?.picture === null ?
                            <div className='d-flex justify-content-around image-form-container'>
                              <div className='update-akun-saya-profile-upload'>
                                <div onClick={() => uploadRef?.current.click()} className="centered">
                                  <CameraIcon className="camera-icon" />
                                  <input ref={uploadRef} type='file' onChange={(e)=>uploadFile(e)} className='position-absolute inputs-ver-2'/>
                                </div>
                              </div>
                            </div>
                            :
                            <div className='d-flex justify-content-around image-form-container'>
                              <div className="update-akun-saya-profile-upload">
                                <Image src={data?.picture.type === 'dummy' ? UrlService.getImageUrl("user.png") : data?.picture.path} className='image-akun-saya-profile'/>
                                <div onClick={() => uploadRef?.current.click()} className="centered with-bg">
                                  <CameraIcon className="camera-icon" />
                                  <input ref={uploadRef} type='file' onChange={(e)=>uploadFile(e)} className='position-absolute inputs-ver-2'/>
                                </div>
                              </div>
                            </div>
                          }
                          <div className="d-desktop button-container">
                            <button type="button" onClick={() => uploadRef?.current.click()} className="upload-button">
                              Upload
                            </button>
                            {
                              data?.picture !== null &&
                              <button type="button" className="remove-button">
                                Remove
                              </button>
                            }
                          </div>
                        </div>

                        <FormGroup className="name-form pl-4 pr-4">
                          <FormLabel>Name</FormLabel>
                          <BasicInput
                            name="name"
                            type="text"
                            border={['bottom']}
                            value={data?.name}
                            onChange={(e)=>onChange(e)}
                          />
                        </FormGroup>
                        <div className={isMobile ? 'flex-direction-column' : 'd-flex'}>
                          <FormGroup className="email-form pl-4 pr-4">
                            <FormLabel>Email</FormLabel>
                            <BasicInput
                              name="email"
                              type="email"
                              border={['bottom']}
                              value={data?.email}
                              onChange={(e)=>onChange(e)}
                            />
                          </FormGroup>
                          <FormGroup className="phone-form pl-4 pr-4">
                            <FormLabel>Phone</FormLabel>
                            <BasicInput
                              name="phone"
                              type="text"
                              border={['bottom']}
                              value={data?.phone}
                              onChange={(e)=>onChange(e)}
                            />
                          </FormGroup>
                        </div>

                        <hr className="d-desktop divider" />

                        <RoundedButton
                          className="update-akun-saya-submit-button"
                          text="Simpan"
                          color="orange"
                          large
                          type="submit"
                          onClick={(e)=>onSubmit(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </>
          }
        />

        
      }
    </>
  );
}

const mapStateToProps = state => ({
  user: state.authentication.currentUser,
})

export default connect(
  mapStateToProps,
  null
)(UpdateAkunSaya)
