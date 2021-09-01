import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import CheckMarkIcon from '../../../../assets/icons/CheckMarkIcon'
import KartuKreditIcon from '../../../../assets/icons/KartuKreditIcon'
import TransferBankIcon from '../../../../assets/icons/TransferBankIcon'

import './ChoosePayment.scss'

const ChoosePayment = ({
    onSelected, // (selected: string) => void
    selected, // '' | 'transfer-bank' | 'kartu-kredit'
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelected = selected => {
        onSelected(selected)
        setIsOpen(false)
    }

    return (
        <>
            {
                isOpen &&
                <div
                    className="choose-payment__backdrop"
                    onClick={() => setIsOpen(false)}
                />
            }
            <div className={`choose-payment__container ${isOpen ? 'open' : ''}`}>
                <div onClick={() => setIsOpen(false)} className="choose-payment__close-button d-desktop">
                    <IoMdClose />
                </div>
                <p className="choose-payment__title">
                    Metode Pembayaran
                </p>
                <div className="choose-payment__options">
                    <div
                        onClick={() => handleSelected('transfer-bank')}
                        className="option"
                    >
                        <TransferBankIcon className="type-icon bank" />
                        <p className="label">
                            Transfer Bank
                        </p>
                        {
                            selected === 'transfer-bank' &&
                            <CheckMarkIcon className="mark-icon" />
                        }
                    </div>
                    <div
                        onClick={() => handleSelected('kartu-kredit')}
                        className="option"
                    >
                        <KartuKreditIcon className="type-icon cc" />
                        <p className="label">
                            Kartu Kredit
                        </p>
                        {
                            selected === 'kartu-kredit' &&
                            <CheckMarkIcon className="mark-icon" />
                        }
                    </div>
                </div>
            </div>
            <button
              className="promo-code__button"
              onClick={() => setIsOpen(true)}
            >
              {
                selected ?
                  'Ubah'
                  :
                  'Pilih'
              }
            </button>
        </>
    )
}

export default ChoosePayment