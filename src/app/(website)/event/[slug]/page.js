import EventSection from '@/src/app/components/EventSection/page';
import { fetchApiData } from '@/src/app/utils/api';
import { notFound } from 'next/navigation';

async function getData(eventSlug) {
    try {
        const data = await fetchApiData(`/api/event/slug/${eventSlug}`);
        if (!data?.events || !Array.isArray(data?.events) || data?.events.length !== 1) {
            return null;
        }

        const event = data?.events[0];

        return {
            event: {
                _id: event?._id,
                title: event?.title,
                description: event?.description || '',
                img: event?.img,
                location: event?.location,
                itinerary: event?.itinerary,
                inclusions: event?.inclusions,
                exclusions: event?.exclusions,
                slug: event?.slug,
                tickets: event?.tickets,
                duration: event?.duration,
                bestTime: event?.bestTime,
                maxElevation: event?.maxElevation,
                activities: event?.activities,
                route: event?.route,
                difficulty: event?.difficulty,
                guideLines: event?.guideLines,
                FAQs: event?.FAQs,
                policy: event?.policy,
                video: event?.video,
                comments: event?.comments,
                basePrice: event?.basePrice,
            }
        };
    } catch (error) {
        console.error('EventPage: Error fetching event:', error.message);
        return null;
    }
}

export default async function EventPage({ params }) {
    const { slug } = params;

    const data = await getData(slug);

    if (!data || !data.event) {
        notFound();
    }

    const { event } = data;

    return (
        <EventSection event={event} />
    );
}
