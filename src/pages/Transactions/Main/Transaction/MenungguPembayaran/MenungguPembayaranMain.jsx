import useWindowSize from "../../../../../hooks/useWindowSize";
import MenungguPembayaranDesktop from "../../../Desktop/Transaction/MenungguPembayaran/MenungguPembayaranDesktop";
import MenungguPembayaran from "../../../Menunggu Pembayaran/MenungguPembayaran";

function MenungguPembayaranMain(){
    const {isMobile, size} = useWindowSize();

    return (
        <>
            {
                isMobile ?    
                    <MenungguPembayaran/>
                    :  
                    <MenungguPembayaranDesktop/>
            }
        </>
    )
}

export default MenungguPembayaranMain;