import React from 'react';
import StaffCard from '../components/StaffCard';

// Load the modular staff data directly from your data folder
import staffMembers from '../data/staff.json';

export default function Staff() {
  return (
    <>
      <PageHero 
        title={t('staff.page_title', 'Our Team')} 
        subtitle={t('staff.page_subtitle', 'Meet the dedicated staff members working behind the scenes to advocate for the Malden community.')} 
      />

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