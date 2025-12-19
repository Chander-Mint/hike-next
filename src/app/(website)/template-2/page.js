'use client'
import React from 'react'
import VideoBanner from '../../components/VideoBanner'
import AboutUs2 from '../../components/AboutUs2'
import UpComingEvents2 from '../../components/UpcomingEvents'
import VideoFooter from '../../components/VideoFooter'
import WhyWithUsTwo from '../../components/WhyWithUsTwo'
import OurGalleryTwo from '../../components/OurGalleryTwo'
import LatestBlogTwo from '../../components/LatestBlogTwo'
import TestimonialsTwo from '../../components/TestimonialsTwo'


export default function Template2 ({data}) {
  return (
    <div>
      {/* <Header2 /> */}
      <VideoBanner />
      <AboutUs2 />
      <UpComingEvents2 upcomingEvents={data?.upcomingEvents} />
      <WhyWithUsTwo />
      <LatestBlogTwo blogs={data?.blogs}  />
      <OurGalleryTwo gallery={data?.gallery} />
      <TestimonialsTwo testimonials={data?.testimonials} />
      
    </div>
  )
}

