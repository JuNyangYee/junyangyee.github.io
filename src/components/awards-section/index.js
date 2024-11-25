import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';
import './style.scss';

function AwardsSection({ awards }) {
  if (!awards || awards.length < 2) return null;
  return (
    <div className="awards-section">
      <SectionHeader title="AWARDS - WORKS" />
      <div className="body">
        {awards.map((awards, index) =>
          index === 0 ? null : (
            <div className="awards" key={index}>
              <div className="date">{awards.date}</div>
              <div className="activity">
                {awards.activity}
                <strong>{awards.role}&nbsp;</strong>
                {awards.links && <IconButtonBar links={awards.links} />}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default AwardsSection;
