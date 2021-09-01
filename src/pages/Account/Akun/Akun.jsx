import useWindowSize from "../../../hooks/useWindowSize";
import AkunSayaMobile from "../Akun Saya/Mobile/AkunSayaMobile"
import UpdateAkunSaya from "../UpdateAkunSaya/UpdateAkunSaya"

function Akun(){
  const {isMobile, size} = useWindowSize();

  return (
    <>
      {
        isMobile ? <AkunSayaMobile/> : <UpdateAkunSaya/>
      }
    </>
  )
}

export default Akun