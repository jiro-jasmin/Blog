import axios from "axios";
import MarkDownIt from "markdown-it";
import Head from "next/head";
import { useEffect } from "react";
import CommentSection from "../../components/CommentSection";

function PostPage({ post }) {
    const md = new MarkDownIt();
    const htmlContent = md.render(post.attributes.content);

    // add target="_blank" to every link in content (= written in markdown)
    // useEffect to prevent error from "document" while code is generated server-side
    useEffect(() => {
        let links = document.querySelectorAll(".content a");
        for (let i = 0; i < links.length; i++) {
            if (links[i].hostname != window.location.hostname) {
                links[i].target = "_blank";
            }
        }
    })

    return (
        <>
            <Head>
                <title>{post.attributes.title} | Jiro Jasmin's blog</title>
                <meta name="description" content={post.attributes.seodescription} />
            </Head>

            <h1>{post.attributes.title}</h1>
            <small>
                {new Date(post.attributes.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
            </small>
            {post.attributes.imagecover.data &&
                <img className="imagecover" src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.attributes.imagecover.data.attributes.url}`} alt="" />
            }
            <section className="description">{post.attributes.description}</section>
            <section className="content" dangerouslySetInnerHTML={{ __html: htmlContent }}></section>
            <hr />
            <CommentSection post={post} />

        </>
    );
}

export default PostPage;

export async function getStaticProps({ params }) {
    const postRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts/${params.id}?populate=*`);

    return {
        props: {
            post: postRes.data.data
        }
    }
}

export async function getStaticPaths() {
    const postRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?populate=*`);

    const paths = postRes.data.data.map((post) => {
        return { params: { id: post.id.toString() } }
    });

    return {
        paths,
        fallback: false
    }
}