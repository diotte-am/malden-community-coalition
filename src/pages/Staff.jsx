import React from 'react';
import StaffCard from '../components/StaffCard';

// Sample Local Data Tree
const staffMembers = [
  {
    id: 1,
    name: "Alex Martinez",
    role: "Executive Director",
    bio: "Alex has over a decade of experience in community organizing and public policy. Born and raised in Malden, they are dedicated to building sustainable partnerships that amplify local grassroots voices.",
    email: "alex@maldencommunitycoalition.org",
    tags: ["Leadership", "Policy", "Partnerships"]
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Program & Volunteer Coordinator",
    bio: "Sarah manages our community workshops, direct outreach initiatives, and volunteer cohorts. She coordinates logistics across our diverse local projects to ensure every voice is supported.",
    email: "sarah@maldencommunitycoalition.org",
    tags: ["Outreach", "Volunteering", "Workshops"]
  }
];

export default function Staff() {
  return (
    <>
      {/* Heritage Gradient Banner */}
      <header className="page-hero-banner">
        <div className="page-hero-content">
          <h2>Our Team</h2>
          <p className="page-subtitle">
            Meet the dedicated staff members working behind the scenes to advocate for the Malden community.
          </p>
        </div>
      </header>

      {/* Main Layout Body Container */}
      <main className="page-container">
        <div className="vertical-stack-container">
          {staffMembers.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>
      </main>

    </>
  );
}