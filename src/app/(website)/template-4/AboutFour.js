import React from 'react'

const AboutFour = () => {
  return (
  <div className="relative text-center py-16 border-b px-4 container mx-auto">
    
      <div className="relative z-10">
        <h3 className="text-cyan-500 text-xl font-semibold mb-2 font-new">Take yourself</h3>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-10">Adventure Ideas</h1>
      </div>
      <div className="max-w-4xl mx-auto grid lg:grid-cols-1 gap-10 items-center">
    

        {/* Right Content */}
        <div>
         
          <p className="text-gray-600 text-lg text-center leading-relaxed mb-6">
            We are committed to delivering excellence in every project we handle. Our dedicated team works passionately to bring innovative and user-centric solutions tailored to your needs.
          </p>
          <ul className="space-y-4 text-center">
            <li className="flex items- justify-center">
              <span className="text-orange-700 text-xl mr-3">✓</span>
              <span className="text-gray-800 text-base">
                Creative and Custom Designs
              </span>
            </li>
            <li className="flex items-start justify-center">
              <span className="text-orange-700 text-xl mr-3">✓</span>
              <span className="text-gray-800 text-base">
                Responsive and User-Friendly Interfaces
              </span>
            </li>
            <li className="flex items-start justify-center">
              <span className="text-orange-700 text-xl mr-3">✓</span>
              <span className="text-gray-800 text-base">
                High-Performance Development Practices
              </span>
            </li>
          </ul>
          
        </div>
      </div>
    </div>
  )
}

export default AboutFour
