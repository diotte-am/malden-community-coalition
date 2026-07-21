import React from 'react';
import { useTranslation } from 'react-i18next';

import './Staff.css';

import staffMembers from '../../data/staff.json';

import StaffCard from '../../components/StaffCard';
import PageHero from '../../components/PageHero';

export default function Staff() {
  const { t, ready } = useTranslation('staff', 'common');

  // Guard clause to prevent rendering raw string keys while the file loads over HTTP
  if (!ready) {
    return <div className="page-container">Loading...</div>;
  }
  
  return (
    <>
      <PageHero 
        title={t('staff:page_title')} 
        subtitle={t('staff:page_subtitle')} 
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

