import React, { useState, useEffect } from "react";
import LogoutButton from "./logOutButton";
import { auth } from "../firebase"; // Import Firebase auth
import "./header.css"

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="head-cont">
            {user ? (
                <div className="user-info">
                    <img src={user.photoURL} alt="Profile" className="profile-pic" />
                    <span className="user-email">Hello, {user.email} Welcome to NYTT. Hope you'll get your things done !!</span>
                    <div className="logout-button">
                        <LogoutButton  />
                    </div>
                </div>
            ) : (
                <span>Loading...</span>
            )}
        </div>
    );
};

export default Header;