import { fetchApiData } from '@/src/app/utils/api';
import { notFound } from 'next/navigation';
import AllEventSection from '@/src/app/components/AllEventSection/page';
export const dynamic = 'force-dynamic';
async function getAllEvents() {
    try {
        const data = await fetchApiData('/api/event');
        if (!data?.events || !Array.isArray(data?.events) || data?.events?.length === 0) {
            return null;
        }
        return data?.events;
    } catch (error) {
        console.error('AllEventsPage: Error fetching events:', error.message);
        return null;
    }
}

export default async function AllEventsPage() {
    const eventsData = await getAllEvents();

    if (!eventsData) {
        notFound();
    }

    const events = eventsData && eventsData.map(event => {
        let startDate = null;

        if (event?.latestTicket?.startDate) {
            try {
                const clean = event.latestTicket.startDate.trim();
                const parsed = new Date(clean);
                if (!isNaN(parsed.getTime())) {
                    startDate = parsed;
                } else {
                    console.error("Invalid parsed date:", clean);
                }
            } catch (e) {
                console.error("Date parsing error:", e);
            }
        }
        if (!event?.title || !event?.img || !event?.slug) {
            throw new Error('Missing required fields in event');
        }
        return {
            title: event?.title,
            description: event?.description,
            month: startDate?.toLocaleString('default', { month: 'short' }),
            year: startDate?.getFullYear().toString(),
            date: startDate?.getDate().toString(),
            location: event?.location,
            price: event?.latestTicket?.price,
            image: event?.img,
            slug: event?.slug,
        };
    });

    const bannerImage = '/images/event-banner.webp';

    return (
        <AllEventSection
            events={events}
            bannerImage={bannerImage}
            heading="EVENTS"
        />
    );
}