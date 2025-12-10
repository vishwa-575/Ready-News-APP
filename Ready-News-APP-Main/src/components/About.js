import React from "react";
import "./About.css";

const teamMembers = [
  {
    name: "E. Vishwanatha Rao",
    role: "Team Lead",
    id: "AP23110010350",
    photo: "/images/vishwa.jpg"
  },
  {
    name: "Harshith Reddy",
    role: "Frontend Developer",
    id: "AP23110011193",
    photo: "/images/harshith.jpg"
  },
  {
    name: "Jyothika Gunta",
    role: "Backend Developer",
    id: "AP23110010121",
    photo: "/images/jyo.jpg"
  },
  {
    name: "Maansi Nalla",
    role: "UI/UX Designer",
    id: "AP23110010721",
    photo: "/images/maansi.jpg"
  }
];

const About = () => {
  return (
    <div className="about-section">
      <div className="container">

        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          We are a passionate team dedicated to building Ready News — a smooth, intelligent
          news platform that delivers real-time updates, curated stories, and user-powered content.
        </p>

        <h2 className="team-heading">Our Team</h2>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.photo} alt={member.name} className="team-photo" />

              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>

              {/* NEW ID LINE */}
              <p className="team-id">ID: {member.id}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
