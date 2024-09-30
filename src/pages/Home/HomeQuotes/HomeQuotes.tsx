import { FC, useEffect, useState } from 'react'
import './HomeQuotes.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { Autoplay, Pagination } from 'swiper/modules'
import { useAppDispatch, useAppSelector } from '../../../server/redux/hooks'
import { getQuotes } from '../../../server/redux/quoteSlice/quotesSlice'
import { useTranslation } from 'react-i18next'

const HomeQuotes: FC = () => {
  const dispatch = useAppDispatch()
  const quotes = useAppSelector(state => state.quotesSlice.quotes)
  const { t, i18n } = useTranslation()
  const [changeLang, setChangeLang] = useState<string>(i18n.language)
  // console.log(changeLang)

  useEffect(() => {
    dispatch(getQuotes())
    setChangeLang(i18n.language)
  }, [i18n.language])

  return <div className='home-quotes'>
    <h3>{ t("Home.titles.Today's Quote")}</h3>
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true
      }}
      modules={[Autoplay, Pagination]}
      className='mySwiper'
    >
      {
        quotes?.map((quote, i) => (
          <SwiperSlide key={i}>
            <div className='home-quotes__item'>
              <p>{changeLang === 'uz' ?
                quote.quote_uz :
                quote.quote_ru
              }</p>
              <p>- {changeLang === 'uz' ?
                quote.quote_author_uz :
                quote.quote_author_ru
              }</p>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  </div>
}

export default HomeQuotes