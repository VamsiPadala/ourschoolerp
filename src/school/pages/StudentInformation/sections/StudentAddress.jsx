import React from 'react';

const StudentAddress = ({ formData, handleChange }) => {
  return (
    <div className="asv2-section">
      <div className="asv2-section-header">
        <div className="asv2-section-icon" style={{ background: '#fff5e6', color: '#ff9f43' }}>📍</div>
        <div>
          <h5>Address &amp; Banking Information</h5>
          <span>Residential address and bank account details</span>
        </div>
      </div>

      <div className="asv2-grid">
        {/* Full-width Address textarea */}
        <div className="asv2-field asv2-full">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter complete residential address"
            className="asv2-input asv2-textarea"
            rows={2}
          />
        </div>

        <div className="asv2-field">
          <label>Village / City</label>
          <select name="village" value={formData.village} onChange={handleChange} className="asv2-input">
            <option value="">Select Village / City</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="secunderabad">Secunderabad</option>
            <option value="vijayawada">Vijayawada</option>
            <option value="visakhapatnam">Visakhapatnam</option>
            <option value="tirupati">Tirupati</option>
            <option value="warangal">Warangal</option>
            <option value="nellore">Nellore</option>
            <option value="kadapa">Kadapa</option>
          </select>
        </div>

        <div className="asv2-field">
          <label>State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="asv2-input" />
        </div>

        <div className="asv2-field">
          <label>Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="asv2-input" />
        </div>

        <div className="asv2-field">
          <label>Aadhaar Card Number</label>
          <input type="text" name="aadhaarCardNumber" value={formData.aadhaarCardNumber} onChange={handleChange} placeholder="12-digit Aadhaar number" className="asv2-input" />
        </div>

        <div className="asv2-field">
          <label>Ration Card Number</label>
          <input type="text" name="rationCardNumber" value={formData.rationCardNumber} onChange={handleChange} placeholder="Enter ration card number" className="asv2-input" />
        </div>

        <div className="asv2-field">
          <label>Student Type</label>
          <select name="studentType" value={formData.studentType} onChange={handleChange} className="asv2-input">
            <option value="">Select Student Type</option>
            <option value="day-scholar">Day Scholar</option>
            <option value="hosteller">Hosteller</option>
            <option value="transport">Transport</option>
          </select>
        </div>

        {/* Banking sub-header */}
        <div className="asv2-field asv2-full">
          <div className="asv2-sub-divider">
            <span>🏦 Bank Account Details</span>
          </div>
        </div>

        <div className="asv2-field">
          <label>Bank Account No</label>
          <input type="text" name="accountNo" value={formData.accountNo} onChange={handleChange} placeholder="Enter bank account number" className="asv2-input" />
        </div>

        <div className="asv2-field">
          <label>Bank Name</label>
          <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Enter bank name" className="asv2-input" />
        </div>

        <div className="asv2-field">
          <label>IFSC Code</label>
          <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="Enter IFSC code" className="asv2-input" />
        </div>

        <div className="asv2-field">
          <label>Branch Name</label>
          <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} placeholder="Enter branch name" className="asv2-input" />
        </div>
      </div>
    </div>
  );
};

export default StudentAddress;
