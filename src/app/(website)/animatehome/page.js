import React from 'react'
import Slider from '@/src/app/(website)/animatehome/Slider'
import AdventureIdeas from '@/src/app/(website)/animatehome/AdventureIdeas'
import AnimateEvent from '@/src/app/(website)/animatehome/AnimateEvent'
import WhatWeOffer from '@/src/app/(website)/template-4/WhatWeOffer'

const AnimateHome = ({data}) => {


  return (
    <div>
      <Slider></Slider>
      <AdventureIdeas />
      <AnimateEvent upcomingEvents={data?.upcomingEvents} />
      <WhatWeOffer />
    </div>
  )
}

export default AnimateHome
