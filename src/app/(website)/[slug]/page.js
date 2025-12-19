import { fetchApiData } from '@/src/app/utils/api';
import ProgramSection from '@/src/app/components/ProgramSection/page';
import { notFound } from 'next/navigation';


async function getData(slug) {
    try {
        const data = await fetchApiData(`/api/category/slug/${slug}`);
        if (!data?.categories || !Array.isArray(data?.categories) || data?.categories?.length === 0) {
            return null;
        }
        return data?.categories[0];
    } catch (error) {
        console.error('CategoryType: Error fetching category:', error.message);
        return null;
    }
}

export default async function CategoryType({ params }) {
    const categoryData = await getData(params.slug);

    if (!categoryData || !categoryData?.subCategories || !Array.isArray(categoryData?.subCategories) || categoryData?.subCategories?.length === 0) {
        notFound();
    }

    const programs = categoryData.subCategories.map(sub => {
        if (!sub?.title || !sub?.img || !sub?.slug || !sub?._id) {
            throw new Error('Missing required fields in subCategory');
        }
        return {
            title: sub.title,
            image: sub?.img[0],
            href: `/${params.slug}/${sub?.slug}`,
            id: sub?._id,
        };
    });

    if (!categoryData?.categoryImg || !categoryData?.name) {
        notFound();
    }

    return (
        <ProgramSection
            bannerImage={categoryData?.categoryImg}
            heading={categoryData?.name}
            programs={programs}
        />
    );
}