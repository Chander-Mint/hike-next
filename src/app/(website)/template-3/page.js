'use client'

import React from "react";
import HeaderThree from "./HeaderThree";
import HeroBannerThree from "./HeroBannerThree";
import TrekkingCards from "./TrekkingCards";
import UpcomingEventsThree from "./UpcomingEventsThree";
import AboutUsThree from "./AboutUsThree";
import OurBlogThree from "./OurBlogThree";
import TestimonialThree from "./TestimonialThree";
import OurGalleryThree from "./OurGalleryThree";
import VideoFooter from "../../components/VideoFooter";

export default function Template3 ({data}) {
  return (
    <div>
      {/* <HeaderThree /> */}
      <HeroBannerThree />
      <TrekkingCards />
      <UpcomingEventsThree upcomingEvents={data?.upcomingEvents} />
      <AboutUsThree />
      <OurBlogThree blogs={data?.blogs} />
      <OurGalleryThree gallery={data?.gallery} />
      <TestimonialThree testimonials={data?.testimonials} />
    </div>
  );
};
