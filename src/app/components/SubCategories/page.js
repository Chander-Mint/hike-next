import EventCard from '@/src/app/components/EventCard/page';
import Link from 'next/link';

export default function SubCategories({ events, bannerImage, heading }) {
    return (
        <div className="flex flex-col items-center">
            <div
                className="relative w-full h-[40vh] sm:h-[50vh] md:h-[63vh] bg-cover bg-center flex items-end justify-center pb-6 sm:pb-8"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bannerImage}')`,
                }}
            >
                <h1 className="text-4xl sm:text-5xl md:text-[69px] font-bold text-white capitalize tracking-wider text-center px-4">
                    {heading}
                </h1>
            </div>

            <div className="w-full mt-8 sm:mt-12 mb-8 sm:mb-12 px-4 sm:px-6 md:px-10">
                <p className='text-md lg:max-w-4xl mx-auto  mb-12 font-semibold text-center text-gray-700'>Walk the sacred paths, find peace in the mountains, and reconnect with your inner self. Our pilgrimage tours blend spirituality with nature’s calm — offering a soul-refreshing experience you’ll never forget.</p>
                {events?.length === 0 ? (
                    <div className="text-center text-gray-700 text-lg sm:text-xl md:text-2xl">
                        Event Not Found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                        {events?.map((event, index) => (
                            <Link href={`/event/${event.slug}`} key={index}>
                                <EventCard {...event} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}