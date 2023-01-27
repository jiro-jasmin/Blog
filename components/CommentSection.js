import CommentForm from './CommentForm';


function CommentSection({ post }) {

    return (
        <>
            <h4>Comments</h4>
            <CommentForm post={post} />
            
            <ul className="comments">
                {post.attributes.comments.data.length === 0 && (<span>No comment yet</span>)}
                {post.attributes.comments.data &&
                    post.attributes.comments.data.reverse().map((comment) => {
                        return (
                            <li key={comment.id}>
                                <span className="author">
                                    {comment.attributes.author}
                                </span>
                                <small>
                                    ({new Date(comment.attributes.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })})
                                </small>
                                <div className="comment">
                                    {comment.attributes.content}
                                </div>
                                <hr />
                            </li>
                        );
                    })}
            </ul>
        </>
    );
}

export default CommentSection;