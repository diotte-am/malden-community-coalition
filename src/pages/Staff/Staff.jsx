import React from 'react';
import { useTranslation } from 'react-i18next';

import './Staff.css';

import staffMembers from '../../data/staff.json';

import StaffCard from '../../components/StaffCard';
import PageHero from '../../components/PageHero';

export default function Staff() {
  const { t } = useTranslation();
  
  return (
    <>
      <PageHero 
        title={t('staff.page_title', 'Our Team')} 
        subtitle={t('staff.page_subtitle', 'Meet the dedicated staff members working behind the scenes to advocate for the Malden community.')} 
      />

      {/* Main Layout Body Container */}
      <main className="page-container staff-page-main">
        <div className="vertical-stack-container staff-list-layout">
          {staffMembers.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>
      </main>
    </>
  );
}