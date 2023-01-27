import { useEffect, useState } from "react";
import PostPreview from "./PostPreview";

function HomeLatestPosts({ posts }) {
    const [latestPosts, setLatestPosts] = useState([]);

    useEffect(() => {
        setLatestPosts(posts.slice(0, 5));
    }, [posts]);


    return (
        <>
            <h2>Latest posts</h2>
            {latestPosts.map(post =>
                <PostPreview post={post} key={post.attributes.title + post.attributes.id} />
            )}
        </>
    );
}

export default HomeLatestPosts;