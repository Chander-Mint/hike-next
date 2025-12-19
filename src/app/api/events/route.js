import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Sample events data - replace this with your actual data source
    const events = [
      {
        title: 'Hiking Adventure',
        img: '/images/events/hiking.jpg',
        slug: 'hiking-adventure',
        description: 'Join us for an exciting hiking adventure in the mountains!'
      },
      {
        title: 'Nature Walk',
        img: '/images/events/nature-walk.jpg',
        slug: 'nature-walk',
        description: 'Explore the beauty of nature with our guided walk'
      },
      {
        title: 'Camping Trip',
        img: '/images/events/camping.jpg',
        slug: 'camping-trip',
        description: 'Experience the great outdoors with our camping trip'
      }
    ];

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
