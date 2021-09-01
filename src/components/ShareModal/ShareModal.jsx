import React, { useEffect, } from 'react'
import './ShareModal.scss'
import {
    TwitterShareButton,
    FacebookShareButton,
    LineShareButton,
    LineIcon,
    WhatsappShareButton,
    TelegramShareButton,
} from "react-share";
import ShareIcon from '../../assets/icons/ShareIcon';

const ShareModal = ({isOpen, close}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    const copyToClipboard = () => {
        let field = document.querySelector('.field');
        let input = document.querySelector('input');
        let copyBtn = document.querySelector('.field button');
        
        input.select();
        if(document.execCommand("copy")){
            field.classList.add('active');
            copyBtn.innerText = 'Copied';
        
            setTimeout(()=>{
                field.classList.remove('active');
                copyBtn.innerText = 'Copy';
            },3500)
        }
    }

    return (
        <>
            {
                (isOpen) &&
                <div
                    className="vendorpopup__backdrop"
                    onClick={close}
                />
            }
            <div className={`share-modal ${(isOpen) ? 'share-modal-open' : 'share-modal-close'}`}>
                <div className="share-modal-dialog">
                    <div className="share-modal-content">
                        <div className="share-modal-header">
                            <h5 className="share-modal-title" id="myModelLabel">Share</h5> 
                        </div>
                        <div className="share-modal-body">
                            <p>Share this link via</p>
                            <div className="d-flex align-items-center icons">
                                <div className="fs-5 d-flex align-items-center justify-content-center link-container"> 
                                    <FacebookShareButton>
                                            <span className="fa fa-facebook-f"></span> 
                                    </FacebookShareButton>
                                </div> 
                                <div className="fs-5 d-flex align-items-center justify-content-center link-container"> 
                                    <TwitterShareButton url={window.location.href}> 
                                            <span className="fa fa-twitter"></span>
                                    </TwitterShareButton> 
                                </div>
                                <div className="fs-5 d-flex align-items-center justify-content-center link-container"> 
                                    <LineShareButton url={window.location.href}>
                                        <LineIcon size={16} />
                                    </LineShareButton>
                                </div> 
                                <div className="fs-5 d-flex align-items-center justify-content-center link-container">
                                    <WhatsappShareButton url={window.location.href}>
                                        <span className="fa fa-whatsapp"></span> 
                                    </WhatsappShareButton>  
                                </div> 
                                <div className="fs-5 d-flex align-items-center justify-content-center link-container">
                                    <TelegramShareButton url={window.location.href}>
                                        <span className="fa fa-telegram"></span>
                                    </TelegramShareButton>  
                                </div> 
                            </div>
                            <p>Or copy link</p>
                            <div className="field d-flex align-items-center justify-content-between"> 
                                <span className="text-center">
                                    <ShareIcon className="icon" />
                                </span> 
                                <input type="text" value={window.location.href}/> <button onClick={copyToClipboard}>Copy</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShareModal