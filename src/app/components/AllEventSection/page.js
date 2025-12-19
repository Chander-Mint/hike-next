import EventCard from '@/src/app/components/EventCard/page';
import Link from 'next/link';

export default function AllEventSection({ events, bannerImage, heading }) {
    return (
        <div className="flex flex-col items-center min-h-screen">
            <div
                className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] bg-cover bg-center flex items-end justify-center pb-4 sm:pb-6 md:pb-8"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bannerImage}')`,
                }}
            >
                <h1 className="text-2xl sm:text-2xl md:text-5xl lg:text-[69px] font-bold text-white capitalize tracking-wider text-center px-4 sm:px-6">
                    {heading}
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12 w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                {events?.map((event, index) => (
                    <Link href={`/event/${event.slug}`} key={index} className="block">
                        <EventCard {...event} />
                    </Link>
                ))}
            </div>
        </div>
    );
}