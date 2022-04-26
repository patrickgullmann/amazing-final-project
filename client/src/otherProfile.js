import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import FriendButton from "./friendButton";
import PrivateChat from "./privateChat";

export default function OtherProfile() {
    const [user, setUser] = useState({});
    const params = useParams();
    const history = useHistory();

    // console.log("parameters: ", params);
    // console.log("parameters: ", history);

    useEffect(() => {
        fetch(`/api/user/${params.id}`)
            .then((resp) => resp.json())
            .then((response) => {
                //checked in server if it is same or no user
                if (response.notAnUser) {
                    history.replace("/");
                } else if (response.currentUser) {
                    history.replace("/");
                } else {
                    setUser(response);
                }
            });
    }, []);

    //need if here bc return runs before mount meaning default img will be displayed
    if (!user.id) {
        return <></>;
    }
    return (
        <div className="containerOtherProfile">
            <section className="otherProfileInfo">
                <h1>
                    Profile of {user.first} {user.last}
                </h1>
                <figure className="figureBigSize">
                    <img
                        className="imgBigSize"
                        src={user.image_url || "/images/defaultPicture.png"}
                        alt={`${user.first} ${user.last}`}
                    />
                </figure>
                <p>{user.biography}</p>
                <FriendButton otherUserId={user.id} />
            </section>
            <PrivateChat
                otherUserId={user.id}
                otherUserFirst={user.first}
                otherUserLast={user.last}
            />
        </div>
    );
}

// -----------Könnte auch Profile Picture nutzen ----
/* <ProfilePicture
                givenClass="bigPicture"
                first={user.first}
                last={user.last}
                imageUrl={user.image_url}
            /> */
