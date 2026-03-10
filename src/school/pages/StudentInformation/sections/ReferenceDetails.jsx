import React from 'react';

const ReferenceDetails = ({ formData, handleChange }) => {
  return (
    <div className="asv2-section">
      <div className="asv2-section-header">
        <div className="asv2-section-icon" style={{ background: '#efedfd', color: '#7367f0' }}>🔗</div>
        <div>
          <h5>Reference Details</h5>
          <span>Guardian and reference contact information</span>
        </div>
      </div>

      <div className="asv2-grid">
        <div className="asv2-field">
          <label>Reference Name</label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            placeholder="Enter reference name"
            className="asv2-input"
          />
        </div>

        <div className="asv2-field">
          <label>Reference Contact</label>
          <input
            type="text"
            name="referenceContact"
            value={formData.referenceContact}
            onChange={handleChange}
            placeholder="Reference phone or email"
            className="asv2-input"
          />
        </div>

        <div className="asv2-field">
          <label>Guardian Relation</label>
          <select
            name="guardianRelation"
            value={formData.guardianRelation}
            onChange={handleChange}
            className="asv2-input"
          >
            <option value="">Select Relation</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="uncle">Uncle</option>
            <option value="aunt">Aunt</option>
            <option value="grandparent">Grand Parent</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="asv2-field">
          <label>Local Guardian</label>
          <input
            type="text"
            name="localGuardian"
            value={formData.localGuardian}
            onChange={handleChange}
            placeholder="Local guardian name"
            className="asv2-input"
          />
        </div>

        <div className="asv2-field">
          <label>Guardian Phone</label>
          <input
            type="tel"
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
            placeholder="Guardian phone number"
            className="asv2-input"
          />
        </div>

        <div className="asv2-field">
          <label>Referred By</label>
          <input
            type="text"
            name="referredBy"
            value={formData.referredBy}
            onChange={handleChange}
            placeholder="Who referred this student?"
            className="asv2-input"
          />
        </div>

        {/* Full-width Reference Address */}
        <div className="asv2-field asv2-full">
          <label>Reference Address</label>
          <textarea
            name="referenceAddress"
            value={formData.referenceAddress}
            onChange={handleChange}
            placeholder="Enter reference / guardian address"
            className="asv2-input asv2-textarea"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferenceDetails;
