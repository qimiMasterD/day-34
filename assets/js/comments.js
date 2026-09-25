function rand(l, r) {
    return Math.floor(Math.random() * (r - l + 1)) + l;
}

function getRandomTimestamps() {
    if (rand(0, 1) === 0) return `${rand(1, 23)} hours ago`;
    return `${rand(1, 30)} days ago`;
}

function CommentForm({ onAddComment }) {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const comment = Object.fromEntries(formData.entries());

        onAddComment(comment);
        e.target.reset();
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <div className="comment-header">New comment</div>
            <div className="comment-user-details">
                <input
                    type="text"
                    className="comment-input-text"
                    name="name"
                    id="authorName"
                    placeholder="Enter your name..."
                />
                <input
                    type="email"
                    className="comment-input-text"
                    name="email"
                    id="authorEmail"
                    placeholder="Enter your email..."
                />
            </div>
            <textarea
                className="comment-textarea"
                name="body"
                id="commentContent"
                placeholder="Write your comments here..."
            ></textarea>
            <button className="comment-submit-button" type="submit">
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </form>
    );
}

let uniqId = 1000;
function Comment({ postId = 1 }) {
    const [comments, setComments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
                );
                if (!response.ok)
                    throw new Error("HTTP Error: ", response.status);

                const comments = await response.json();
                const updatedComments = await Promise.all(
                    comments.map(async (comment) => {
                        const imageResponse = await fetch(
                            `https://ui-avatars.com/api/?name=${comment.name}&background=random`,
                        );
                        const imageUrl = imageResponse.url;
                        return {
                            ...comment,
                            imageUrl,
                        };
                    }),
                );
                setLoading(false);
                setComments(updatedComments);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const addComment = async (comment) => {
        try {
            const imageResponse = await fetch(
                `https://ui-avatars.com/api/?name=${comment.name}&background=random`,
            );
            if (!imageResponse.ok)
                throw new Error("HTTP Error: ", imageResponse.status);
            const imageUrl = imageResponse.url;
            comment.imageUrl = imageUrl;
            comment.postId = Number(postId);
            comment.id = ++uniqId;
            const updatedComments = [...comments];
            updatedComments.push(comment);
            setComments(updatedComments);
        } catch (error) {
            console.log(error);
        }
    };

    if (loading)
        return (
            <>
                <h1 className="comments-heading">Comments</h1>
                <div className="comments-wrapper">
                    <div className="loading">Loading comments...</div>
                </div>
            </>
        );

    return (
        <>
            <h1 className="comments-heading">Comments</h1>
            <div className="comments-wrapper">
                <CommentForm onAddComment={addComment} />

                <div className="comment-list">
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-avatar">
                                    <img
                                        src={comment.imageUrl}
                                        alt={comment.name}
                                    />
                                </div>
                                <div className="comment-content">
                                    <div className="comment-metadata">
                                        <div className="comment-author">
                                            {comment.name}
                                        </div>
                                        <div className="comment-email">
                                            {comment.email}
                                        </div>
                                        <div className="comment-timestamp">
                                            {getRandomTimestamps()}
                                        </div>
                                    </div>
                                    <div className="comment-text">
                                        {comment.body}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Comment postId="1" />);
