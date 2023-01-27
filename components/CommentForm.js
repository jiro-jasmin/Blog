import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function CommentForm({ post }) {
    const [values, setValues] = useState({
        author: "",
        comment: "",
        honey: ""
    });

    const [error, setError] = useState(false);
    const buttonRef = useRef();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // so that the following request can be sent

        // prevent bot from submitting : no post
        if (values.honey !== '') {
            return;
        }

        if (values.author.length < 3 || values.comment.length < 5) {
            setError(true);
            return;
        }

        buttonRef.current.disabled = true;
        setLoading(() => true);

        axios
            .post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments`,
                {
                    data: {
                        author: values.author,
                        content: values.comment,
                        post: post.id
                    }
                }
            )
            .then(function (response) {
                console.log("posting data");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        router.reload(); // page needs to reload to display the new comment as it is a static page
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* This is for the bot */}
            <div className="honey">
                <input type="text"
                    name="honey"
                    value={values.honey}
                    minLength="1"
                    maxLength="50"
                    onChange={handleChange} />
                <label htmlFor="email">Email</label>
            </div>

            <div className="form-group">
                <input type="text"
                    required="required"
                    value={values.author}
                    name="author"
                    minLength="1"
                    maxLength="50"
                    onChange={handleChange} />
                <label htmlFor="input" className="control-label">Your name</label><i className="bar"></i>
                {error && values.author.length < 3 && <i className="input-error">Please enter a name longer than 3 characters.</i>}

            </div>
            <div className="form-group">
                <textarea
                    required="required"
                    value={values.comment}
                    name="comment"
                    minLength="1"
                    maxLength="500"
                    rows="6" cols="60"
                    onChange={handleChange} ></textarea>
                <label htmlFor="textarea" className="control-label">Your comment</label><i className="bar"></i>
                {error && values.comment.length < 5 && <i className="input-error">Please enter a comment longer than 5 characters.</i>}

            </div>
            {error && (values.author.length < 3 || values.comment.length < 5) ?
                <button type="submit" ref={buttonRef} className="error"> Leave a comment </button>
                :
                <button type="submit" ref={buttonRef}> Leave a comment </button>
            }
            {loading && <span>Sending... <span id="loading"></span></span>}

        </form>
    );
}

export default CommentForm;