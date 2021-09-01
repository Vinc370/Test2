import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CustomImage from '../../../components/CustomImage/CustomImage';
import HeaderNavigationV2 from '../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2';
import NavigationBar from "../../../components/ForMobile/NavigationBar/NavigationBar";
import Header from "../../../components/Header/Header";
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useWindowSize from '../../../hooks/useWindowSize';
import { getSinglePromoBanner } from '../../../redux/actions/promo/singlePromoBanner';

function SinglePromoBanner({getSinglePromoBanner, banner, error, notFound}){
  useDocumentTitle((banner?.promotion_name ?? 'Promo') + ' - Promo - Littlecloud');

  const { url } = useParams();
  const [content, setContent] = useState(null)
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const {isMobile, size} = useWindowSize();

  useEffect( () => {
    setIsLoading(true)
    getSinglePromoBanner(url)
    setIsLoading(false)
  }, [getSinglePromoBanner, url])

  useEffect(() => {
    if (error) {
        setContent(<h1>Error occured, please reload the page</h1>)
        return
    }
    if (notFound) {
        history.push('/')
        return
    }
    if (banner) {
        setContent(
            <div className='min-height-95'>
                <MetaTags>
                  <meta name="description" content="Temukan promo dan diskon terbaik untuk acaramu di Littlecloud!. Diskon hingga 50%" />
                </MetaTags>
                <div className='promo-description pb-3'>
                    {!isMobile && <Header/>}
                    <HeaderNavigationV2 title={'Promo'} isBlack sticky={true}/>
                    <div style={{width:'90%',margin:'auto'}}>
                        <CustomImage link={''} source={banner.promotion_image} width={'95%'} />
                        <div className="up-bottom-margin">
                          <h1 className="font-weight-bold">
                            {banner.promotion_name}
                          </h1>
                        </div>
                        <p className='m-2'>
                          {
                            banner.promotion_detail.split("\n").map(function(item, idx) {
                                return (
                                    <span key={idx}>
                                        {item}
                                        <br/>
                                    </span>
                                )
                            })
                          }
                        </p>
                         {/*<button className='signature-button mt-2 mb-5 w-100'>Lihat Produk</button>*/}
                    </div>
                    <NavigationBar/>
                </div>
            </div>
        )
    }
  }, [banner, error, notFound])

  return (
    <main>
        {isLoading && <LoadingSpinner className="mt-5" />}
        {content}
    </main>
  );
}

const mapStateToProps = state => ({
  banner: state.singlePromoBanner.data,
  error: state.singlePromoBanner.error,
  notFound: state.singlePromoBanner.notFound,
})

export default connect(mapStateToProps, {getSinglePromoBanner})(SinglePromoBanner)