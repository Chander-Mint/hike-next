import { fetchApiData } from '@/src/app/utils/api';
import { notFound } from 'next/navigation';
import Gallery from '../../components/Gallery/page';
export const dynamic = 'force-dynamic';
async function getGalleryData() {
    try {
        const data = await fetchApiData('/api/gallery');
        if (!data || typeof data !== 'object') {
            return null;
        }
        if (!data?.images || !Array.isArray(data?.images)) {
            return null;
        }
        return data.images;
    } catch (error) {
        console.error('GalleryPage: Error fetching gallery data:', error.message);
        return null;
    }
}

export default async function GalleryPage() {
    const images = await getGalleryData();

    if (!images) {
        notFound();
    }


    const bannerImage = '/images/common-banner.webp';
    const heading = 'OUR GALLERY';

    return (
        <Gallery
            images={images}
            bannerImage={bannerImage}
            heading={heading}
        />
    );
}