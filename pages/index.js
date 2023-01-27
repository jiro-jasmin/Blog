import axios from "axios";
import Head from "next/head";
import HomeHeader from "../components/HomeHeader";
import HomeLatestPosts from "../components/HomeLatestPosts";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>React and Next.js web dev blog | Jiro Jasmin's blog</title>
        <meta name="description" content="This is my blog!" />
      </Head>
      <HomeHeader />
      <HomeLatestPosts posts={posts} />
    </>
  )
}

export async function getStaticProps() {
  const postRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?sort=date:desc&populate=*`);

  return {
    props: {
      posts: postRes.data.data
    }
  }
}