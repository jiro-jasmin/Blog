import axios from "axios";
import AllPosts from "../../components/AllPosts";
import useSWR from "swr";
import { useState } from "react";
import Head from "next/head";


function Posts({ posts }) {

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const [pageIndex, setPageIndex] = useState(1);

    const [sortByDate, setSortByDate] = useState('desc');


    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?sort=date:${sortByDate}&pagination[page]=${pageIndex}&pagination[pageSize]=8&populate=*`, fetcher, {
        fallbackData: posts
    });
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            <Head>
                <title>All posts | Jiro Jasmin's blog</title>
                <meta name="description" content="These are all the posts of my blog" />
            </Head>
            {sortByDate === 'desc' && <button onClick={() => setSortByDate('asc')}>Sort by oldest</button>}
            {sortByDate === 'asc' && <button onClick={() => setSortByDate('desc')}>Sort by newest</button>}

            <AllPosts posts={data} />
            <nav className="pagination">
                <span>
                    <button disabled={pageIndex === 1} onClick={() => setPageIndex(pageIndex - 1)}>
                        Previous
                    </button>
                    <button disabled={pageIndex === (data && data.meta.pagination.pageCount)} onClick={() => setPageIndex(pageIndex + 1)}>
                        Next
                    </button>
                </span>
                <span>{`${pageIndex} of ${data && data.meta.pagination.pageCount}`}</span>
            </nav>
        </>
    );
}

export default Posts;

export async function getStaticProps() {
    const postRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=8&populate=*`);

    return {
        props: {
            posts: postRes.data
        }
    }
}