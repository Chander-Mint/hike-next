import SubCategories from '@/src/app/components/SubCategories/page';
import { fetchApiData } from '@/src/app/utils/api';
import { notFound } from 'next/navigation';

async function getData(subCategoriesSlug) {
    try {
        const data = await fetchApiData(`/api/category/subCategory/slug/${subCategoriesSlug}`);
        if (!data?.data?.categoryDetails || !data?.data?.categoryDetails?.subCategory) {
            return null;
        }
        return {
            events: data?.data?.events || [],
            subCategory: data?.data?.categoryDetails?.subCategory,
        };
    } catch (error) {
        console.error('SubCategoryPage: Error fetching events:', error.message);
        return null;
    }
}

export default async function SubCategoryPage({ params }) {
    const { slug, subCategories } = params;

    const data = await getData(subCategories);

    if (!data || !data.subCategory) {
        notFound();
    }

    const { events, subCategory: subCategoryData } = data;

    const eventData = events.map(event => {
        const startDate = new Date(event?.latestTicket?.startDate);
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
    const heading = `${subCategoryData?.title.toUpperCase()}`;
    const bannerImage = subCategoryData?.img[0];

    return (
        <SubCategories
            events={eventData}
            bannerImage={bannerImage}
            heading={heading}
        />
    );
}