import React from "react";
import "./GlassyProfileCard.scss";

interface Props {
  name: string;
  role: string;
  image: string;
}

const GlassyProfileCard: React.FC<Props> = ({
  name,
  role,
  image,
}) => {
  return (
    <div className="glassy-profile-card">
      <img src={image} alt={name} className="profile-image" />

      <h2>{name}</h2>
      <p>{role}</p>

      <div className="social-buttons">
        <button>Follow</button>
        <button>Message</button>
      </div>
    </div>
  );
};

export default GlassyProfileCard;
