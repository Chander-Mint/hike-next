'use client'
import React from 'react'
import VideoFooter from '../../components/VideoFooter'
import BannerFour from './BannerFour'
import AboutFour from './AboutFour'
import WhatWeOffer from './WhatWeOffer'
import UpcomingEventFour from './UpcomingEventFour'
import BlogsFour from './BlogsFour'
import TestimonialFour from './TestimonialFour'
import GalleryFour from './GalleryFour'

export default function Template4 ({data}) {
  return (
    <div>
     <BannerFour />
      <AboutFour />
      <UpcomingEventFour upcomingEvents={data?.upcomingEvents} />
      <WhatWeOffer />
      <BlogsFour blogs={data?.blogs} />
      <GalleryFour gallery={data?.gallery} />
      <TestimonialFour testimonials={data?.testimonials} />
    </div>
  )
}

