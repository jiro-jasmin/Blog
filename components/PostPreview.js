import Image from "next/image";
import Link from "next/link";

function PostPreview({ post }) {

    return (
        <Link href={`/posts/${post.id}`} aria-label="Read the full post">
            <div className="postPreview">
                <h3>{post.attributes.title}</h3>
                <small>
                    {new Date(post.attributes.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                </small>
                {post.attributes.imagecover.data ?
                    <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.attributes.imagecover.data.attributes.url}`} alt="" />
                    :
                    <Image src="/images/placeholder.png" alt="" width="1000" height="150" />
                }


                <p>{post.attributes.description}</p>
            </div>
        </Link>
    );
}

export default PostPreview;