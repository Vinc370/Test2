import useWindowSize from "../../../../../hooks/useWindowSize";
import TagihanDesktop from "../../../Desktop/Transaction/Tagihan/TagihanDesktop";
import Tagihan from "../../../Tagihan/Tagihan";

function TagihanMain(){
    const {isMobile, size} = useWindowSize();

    return (
        <>
            {
                isMobile ?    
                    <Tagihan/>
                    :  
                    <TagihanDesktop/>
            }
        </>
    )
}

export default TagihanMain;