import useWindowSize from "../../../../../hooks/useWindowSize";
import RiwayatDesktop from "../../../Desktop/Transaction/Riwayat/RiwayatDesktop";
import Riwayat from "../../../Mobile/Riwayat/Riwayat";

function RiwayatMain(){
    const {isMobile, size} = useWindowSize();

    return (
        <>
            {
                isMobile ?    
                    <Riwayat/>
                    :  
                    <RiwayatDesktop/>
            }
        </>
    )
}

export default RiwayatMain;