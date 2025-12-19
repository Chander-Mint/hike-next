'use client'
import React from 'react'

import BannerFive from './BannerFive'
import AboutUsFive from './AboutUsFive'
import UpcomingEventFive from './UpcomingEventFive'
import BlogsFive from './BlogsFive'
import GalleryFive from './GalleryFive'
import TestimonialFive from './TestimonialFive'
import Slider from '@/src/app/(website)/animatehome/Slider'


export default function Template5({ data }) {
  return (
    <div>
      {/* <BannerFive /> */}
      <Slider />
      <AboutUsFive />
      <UpcomingEventFive upcomingEvents={data?.upcomingEvents} />
      <BlogsFive blogs={data?.blogs} />
      <TestimonialFive testimonials={data?.testimonials} />
            <GalleryFive gallery={data?.gallery} />


    </div>
  )
}

