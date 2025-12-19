import { fetchApiData } from '@/src/app/utils/api';
import { notFound } from 'next/navigation';
import AllBlogsSection from '@/src/app/components/AllBlogsSection/page';
export const dynamic = 'force-dynamic';
async function getAllBlogs() {
    try {
        const data = await fetchApiData('/api/blog');
        if (!data?.blogs || !Array.isArray(data?.blogs) || data?.blogs?.length === 0) {
            return null;
        }
        return data?.blogs;
    } catch (error) {
        console.error('AllBlogsPage: Error fetching blogs:', error.message);
        return null;
    }
}

export default async function AllBlogsPage() {
    const blogsData = await getAllBlogs();

    if (!blogsData) {
        notFound();
    }

    const blogs = blogsData.map(blog => {
        const createdAt = new Date(blog?.createdAt);
        if (!blog?.title || !blog?.bannerImg || !blog?.slug) {
            throw new Error('Missing required fields in blog');
        }
        return {
            img: blog?.img,
            title: blog?.title,
            shortDescription: blog?.shortDescription,
            bannerImg: blog?.bannerImg,
            slug: blog?.slug,
            createdAt: createdAt?.toISOString(),
        };
    });

    const bannerImage = '/images/blog-bg.webp';

    return (
        <AllBlogsSection
            blogs={blogs}
            bannerImage={bannerImage}
            heading="BLOG PAGE"
        />
    );
}