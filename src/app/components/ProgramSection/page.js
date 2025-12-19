import Link from "next/link";
import Image from "next/image";

export default function ProgramSection({
  bannerImage,
  heading,
  programs = [],
}) {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div
        className="relative w-full h-[calc(100vw*1/3)] bg-cover bg-center flex items-end justify-center pb-6 sm:pb-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bannerImage}')`,
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-[69px] font-bold text-white capitalize tracking-wider text-center px-4">
          {heading}
        </h1>
      </div>
      <div className="container mx-auto px-4 text-center sm:px-6 md:px-10 py-8 sm:py-12 border-b">
        <h2 className="font-semibold text-xl mb-3">Plan A Tour with Us</h2>
        <p className="text-md text-gray-800">
          Every journey begins with a spark — a desire to explore, discover, and
          experience something new. At <strong>HIKE</strong> , we help turn that
          spark into a perfectly crafted tour. Whether are looking for
          spiritual serenity, team-building experiences, or meaningful group
          adventures, we are here to guide you every step of the way. From serene
          landscapes to cultural landmarks, our tours are tailored to match your
          purpose, your pace, and your passion. Let us handle the planning — so
          you can focus on the adventure ahead. Start your journey today.
          Adventure is calling.
        </p>
      </div>
      {programs.length === 0 ? (
        <p className="text-center text-white text-lg mt-8">
          No programs available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 px-4 sm:px-6 md:px-10 mt-8 sm:mt-12 w-full mb-8 sm:mb-12">
          {programs.map((program) => (
            <Link
              href={program.href}
              key={program.id || program.title}
              className="relative flex flex-col items-center group overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-full aspect-[3/2] md:aspect-[3/4] relative overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={true}
                />
                {/* Black overlay always visible */}
                <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-500 group-hover:bg-opacity-70" />
                {/* Title centered over image, animates on hover */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-white text-base sm:text-lg md:text-xl font-bold uppercase text-center px-4 transform translate-y-10 group-hover:-translate-y-10 transition-transform duration-500">
                    {program.title}
                  </h2>
                </div>
              </div>
              {/* <button className="px-3 sm:px-4 py-1 sm:py-2 bg-white border-2 border-orange-500 text-orange-500 font-semibold w-full text-base sm:text-lg md:text-xl uppercase transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 hover:scale-105">
                {program.title}
              </button> */}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
