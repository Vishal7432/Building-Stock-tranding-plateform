import React from "react";

// UserCard supports two modes:
// - compact: shows only avatar + name (for navbar)
// - expanded: shows email, bio and a logout button
const UserCard = ({
  name = "User",
  email = "user@example.com",
  image = "logo.png",
  compact = false,
  onLogout = () => {},
}) => {
  if (compact) {
    return (
      <div className="user-card compact">
        <img src={image} alt={name} />
        <h4 className="name">{name}</h4>
      </div>
    );
  }

  return (
    <div className="user-card">
      <img src={image} alt={name} />
      <h2 className="name">{name}</h2>
      <p className="email">{email}</p>
      <button className="logout w-6  rounded" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserCard;
