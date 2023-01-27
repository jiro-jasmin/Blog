import PostPreview from "./PostPreview";

function AllPosts({ posts }) {

    return (
        <>
            <h2>Posts</h2>
            {posts && posts.data.map(post =>
                <PostPreview post={post} key={post.attributes.title + post.attributes.id} />
            )}
        </>
    );
}

export default AllPosts;