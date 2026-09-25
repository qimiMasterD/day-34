function Blog({ limit }) {
    const [blogs, setBlogs] = React.useState(null);
    const [blogModal, setBlogModal] = React.useState(null);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`,
                );
                if (!response.ok)
                    throw new Error("HTTP Error: ", response.status);

                const blogs = await response.json();
                setBlogs(blogs);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    if (blogs === null)
        return (
            <>
                <h1 className="section-title">Today's top blogs</h1>
                <div className="loading">Loading posts...</div>
            </>
        );
    return (
        <>
            <h1 className="section-title">Today's top blogs</h1>
            <div className="blog-grid">
                {blogs.map((blog) => {
                    return (
                        <article className="blog-card">
                            <span className="blog-id">#{blog.id}</span>
                            <div className="blog-content">
                                <h2 className="blog-title">{blog.title}</h2>
                                <p className="blog-excerpt">{blog.body}</p>
                            </div>
                            <button
                                className="blog-btn"
                                onClick={() => {
                                    setBlogModal(blog);
                                }}
                            >
                                See more <span className="arrow">&rarr;</span>
                            </button>
                        </article>
                    );
                })}
            </div>

            <div className={`modal-overlay ${blogModal ? "show" : ""}`}>
                <div className="modal-container">
                    <h1 className="modal-title">
                        {blogModal ? blogModal.title : null}
                    </h1>
                    <div className="modal-body">
                        <p className="modal-text">
                            {blogModal ? blogModal.body : null}
                        </p>
                    </div>
                    <button
                        className="modal-btn-close"
                        onClick={() => {
                            setBlogModal(null);
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Blog limit={12} />);
