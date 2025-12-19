import BlogDetails from '@/src/app/components/BlogDetails/page';
import { fetchApiData } from '@/src/app/utils/api';
import { notFound } from 'next/navigation';

async function getBlogData(blogSlug) {
    try {
        const data = await fetchApiData(`/api/blog/slug/${blogSlug}`);
        if (!data || !data?.blog || data?.blog?.length === 0) {
            return null;
        }
        return data?.blog[0];
    } catch (error) {
        console.error('BlogPage: Error fetching blog data:', error.message);
        return null;
    }
}

export default async function BlogPage({ params }) {
    const { slug } = params;

    const blogData = await getBlogData(slug);

    if (!blogData) {
        notFound();
    }

    const bannerImage = blogData?.bannerImg;
    const heading = blogData?.title;

    return (
        <BlogDetails
            bannerImage={bannerImage}
            heading={heading}
            blog={blogData}
        />
    );
}