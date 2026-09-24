function ProfileCard({ id }) {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${id}`,
                );
                if (!response.ok)
                    throw new Error("HTTP error: ", response.status);

                const user = await response.json();
                setUser(user);
            } catch (error) {
                console.log(error);
                return;
            }
        };
        getData();
    }, []);

    if (user === null) return <span className="loading">Loading info...</span>;
    return (
        <>
            <div className="profile-card">
                <div className="profile-header">
                    <h1 className="profile-title">Profile Card</h1>
                </div>

                <div className="profile-body">
                    <div className="profile-identity">
                        <h2 className="profile-name">{user.name}</h2>
                        <span className="profile-username">
                            @{user.username}
                        </span>
                    </div>

                    <div className="profile-contact">
                        <div className="contact-item email">{user.email}</div>
                        <div className="contact-item phone">{user.phone}</div>
                        <div className="contact-item website">
                            {user.website}
                        </div>
                    </div>

                    <div className="profile-location">
                        <div className="address-street">
                            {user.address.street} {", "} {user.address.suite}
                        </div>
                        <div className="address-city">{user.address.city}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<ProfileCard id="1" />);
