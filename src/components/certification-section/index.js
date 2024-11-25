import React from 'react';
import SectionHeader from '../section-header';
import IconButtonBar from '../icon-button-bar';
import './style.scss';

function CertificationSection({ certification }) {
  if (!certification || certification.length < 2) return null;
  return (
    <div className="certification-section">
      <SectionHeader title="CERTIFICATION" />
      <div className="body">
        {certification.map((certification, index) =>
          index === 0 ? null : (
            <div className="certification" key={index}>
              <div className="date">{certification.date}</div>
              <div className="activity">
                {certification.activity}&nbsp;
                {certification.links && <IconButtonBar links={certification.links} />}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default CertificationSection;
