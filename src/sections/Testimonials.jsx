import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Eyebrow, Lines } from '../components/animations.jsx'
import { commitments } from '../data/people.js'

export default function Testimonials({ n }) {
  return (
    <section className="sec navy testi">
      <div className="wrap">
        <Eyebrow n={n} light>Client experience</Eyebrow>
        <Lines text={'Trusted partnerships.\nLasting relationships.'} className="h-xl" />
        <Swiper modules={[Navigation, Pagination, Keyboard, Autoplay]} navigation pagination={{ clickable: true }} keyboard loop autoplay={{ delay: 6500, disableOnInteraction: true }} speed={800} className="tswiper">
          {commitments.map((t, i) => (
            <SwiperSlide key={i}><blockquote><span aria-hidden="true">“</span><p>{t.quote}</p><footer><b>Our commitment</b><i>{t.tag}</i></footer></blockquote></SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
