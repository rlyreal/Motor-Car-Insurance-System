import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/record.css';

function Menu() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [ratesData, setRatesData] = useState({
    premium: '',
    otherCharges: ''
  });

  const calculateRates = () => {
    const premium = parseFloat(ratesData.premium) || 0;
    const docStamps = premium * 0.125; // 12.5%
    const eVat = premium * 0.12; // 12%
    const lgt = premium * 0.005; // 0.5%
    const authFee = 50.40;
    const otherCharges = parseFloat(ratesData.otherCharges) || 0;
    const total = premium + docStamps + eVat + lgt + authFee + otherCharges;

    return {
      premium,
      docStamps,
      eVat,
      lgt,
      authFee,
      otherCharges,
      total
    };
  };

  const rates = calculateRates();
  const [formData, setFormData] = useState({
    assured: '',
    address: '',
    cocNumber: '',
    policyNumber: '',
    dateIssued: '',
    dateReceived: '',
    agent: '',
    subAgent: '',
    region: '',
    insuranceFromDate: '',
    insuranceFromTime: '12:00',
    insuranceToDate: '',
    insuranceToTime: '12:00',
    invoiceNumber: '',
    cType: '',
    model: '',
    make: '',
    bodyType: '',
    color: '',
    mvFileNo: '',
    plateNo: '',
    serialChassisNo: '',
    motorNo: '',
    authorizedCapacity: '',
    unladenWeight: '',
    weightClass: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBack = () => {
    navigate('/records');
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && isQuickReferenceComplete()) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check Quick Reference completion (only fields that count toward completion)
  const isQuickReferenceComplete = () => {
    return formData.assured && formData.address && formData.cocNumber;
  };

  // Check section completion
  const isPolicyInfoComplete = () => {
    return formData.policyNumber && formData.dateIssued && formData.dateReceived;
  };

  const isInsurancePeriodComplete = () => {
    return formData.insuranceFromDate && formData.insuranceToDate;
  };

  const isVehicleDetailsComplete = () => {
    return formData.model && formData.make && formData.bodyType && formData.color && formData.plateNo && formData.serialChassisNo && formData.motorNo;
  };

  // Calculate overall form completion percentage based on Quick Reference only
  const getFormCompletionPercentage = () => {
    return isQuickReferenceComplete() ? 100 : 0;
  };

  const completionPercentage = getFormCompletionPercentage();

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8fafc', padding: '32px 16px'}}>
      {/* Modern Header */}
      <div style={{maxWidth: '1400px', margin: '0 auto', marginBottom: '40px'}}>
        <div style={{backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px'}}>
            <img src="/images/alpha.jpg" alt="Alpha Logo" style={{height: '35px', objectFit: 'contain'}} />
            <div>
              <h1 style={{fontSize: '32px', fontWeight: '700', color: '#1f2937', margin: 0}}>Underwriting System Menu</h1>
              <p style={{fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0'}}>Motor Car Insurance - Complete the form to proceed</p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px'}}>
            {[
              {label: 'Info', step: 1},
              {label: 'Rates', step: 2},
              {label: 'Review', step: 3}
            ].map((step, idx) => (
              <div key={idx} style={{display: 'flex', alignItems: 'center', flex: 1}}>
                <div 
                  onClick={() => handleStepClick(step.step)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: step.step <= currentStep ? '#1a5f3f' : '#e5e7eb',
                    color: step.step <= currentStep ? 'white' : '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: step.step < currentStep ? 'pointer' : 'default',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (step.step < currentStep) {
                      e.target.style.backgroundColor = '#165035';
                      e.target.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (step.step < currentStep) {
                      e.target.style.backgroundColor = '#1a5f3f';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {idx + 1}
                </div>
                <span style={{marginLeft: '12px', fontSize: '13px', fontWeight: '500', color: step.step <= currentStep ? '#1a5f3f' : '#6b7280'}}>{step.label}</span>
                {idx < 2 && <div style={{flex: 1, height: '2px', backgroundColor: step.step < currentStep ? '#1a5f3f' : '#e5e7eb', margin: '0 16px'}}></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 2fr', gap: '24px'}}>
          {/* Left Sidebar */}
          <div>
            <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
              <h3 style={{fontSize: '14px', fontWeight: '700', color: '#1f2937', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Quick Reference</h3>
              
              {/* Completion Tracking */}
              <div style={{marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: completionPercentage === 100 ? '#1a5f3f' : '#e5e7eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700'}}>
                  {completionPercentage === 100 ? '✓' : '○'}
                </div>
                <span style={{fontSize: '13px', color: completionPercentage === 100 ? '#1a5f3f' : '#d1d5db', fontWeight: '600'}}>
                  {completionPercentage === 100 ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              
              <div style={{marginBottom: '24px'}}>
                <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px', textTransform: 'uppercase'}}>Assured</label>
                <input 
                  type="text" 
                  name="assured"
                  value={formData.assured}
                  onChange={handleChange}
                  placeholder="Enter assured name" 
                  style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                />
              </div>

              <div style={{marginBottom: '24px'}}>
                <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px', textTransform: 'uppercase'}}>Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address" 
                  style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                />
              </div>

              <div>
                <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px', textTransform: 'uppercase'}}>COC Number</label>
                <input 
                  type="text" 
                  name="cocNumber"
                  value={formData.cocNumber}
                  onChange={handleChange}
                  placeholder="Enter COC no." 
                  style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                />
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div>
            {/* STEP 1: Info */}
            {currentStep === 1 && (
              <>
                {/* Section 1: Policy Information */}
                <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #f0f9ff'}}>
                    <h3 style={{fontSize: '14px', fontWeight: '700', color: '#1f2937', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Policy Information</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: isPolicyInfoComplete() ? '#1a5f3f' : '#e5e7eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700'}}>
                        {isPolicyInfoComplete() ? '✓' : '○'}
                      </div>
                      <span style={{fontSize: '12px', color: isPolicyInfoComplete() ? '#1a5f3f' : '#d1d5db', fontWeight: '600'}}>
                        {isPolicyInfoComplete() ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: '80px 1fr 120px 150px 150px', gap: '16px', alignItems: 'flex-end'}}>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Type</label>
                      <select style={{width: '100%', padding: '10px 8px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}}>
                        <option>Select Type</option>
                        <option>MC</option>
                        <option>PC</option>
                        <option>LV</option>
                        <option>LTO</option>
                      </select>
                    </div>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Policy Number</label>
                      <input 
                        type="text" 
                        name="policyNumber"
                        value={formData.policyNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setFormData(prev => ({ ...prev, policyNumber: value }));
                        }}
                        placeholder="Policy number" 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Year</label>
                      <select style={{width: '100%', padding: '10px 8px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}}>
                        <option>2026</option>
                        <option>2025</option>
                        <option>2024</option>
                      </select>
                    </div>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Issued</label>
                      <input 
                        type="date" 
                        name="dateIssued" 
                        value={formData.dateIssued} 
                        onChange={handleChange} 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Received</label>
                      <input 
                        type="date" 
                        name="dateReceived" 
                        value={formData.dateReceived} 
                        onChange={handleChange} 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Insurance Period */}
                <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #1a5f3f'}}>
                    <h3 style={{fontSize: '14px', fontWeight: '700', color: '#1f2937', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Insurance Period</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: isInsurancePeriodComplete() ? '#1a5f3f' : '#e5e7eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700'}}>
                        {isInsurancePeriodComplete() ? '✓' : '○'}
                      </div>
                      <span style={{fontSize: '12px', color: isInsurancePeriodComplete() ? '#1a5f3f' : '#d1d5db', fontWeight: '600'}}>
                        {isInsurancePeriodComplete() ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>From Date</label>
                      <input 
                        type="date" 
                        name="insuranceFromDate" 
                        value={formData.insuranceFromDate} 
                        onChange={handleChange} 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>To Date</label>
                      <input 
                        type="date" 
                        name="insuranceToDate" 
                        value={formData.insuranceToDate} 
                        onChange={handleChange} 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Vehicle Details */}
                <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #dbeafe'}}>
                    <h3 style={{fontSize: '14px', fontWeight: '700', color: '#1f2937', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Vehicle Details</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: isVehicleDetailsComplete() ? '#1a5f3f' : '#e5e7eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700'}}>
                        {isVehicleDetailsComplete() ? '✓' : '○'}
                      </div>
                      <span style={{fontSize: '12px', color: isVehicleDetailsComplete() ? '#1a5f3f' : '#d1d5db', fontWeight: '600'}}>
                        {isVehicleDetailsComplete() ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Model</label>
                      <input 
                        type="text" 
                        name="model" 
                        value={formData.model} 
                        onChange={handleChange} 
                        placeholder="Enter model" 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Make</label>
                      <input 
                        type="text" 
                        name="make" 
                        value={formData.make} 
                        onChange={handleChange} 
                        placeholder="Enter make" 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Body Type</label>
                      <input 
                        type="text" 
                        name="bodyType" 
                        value={formData.bodyType} 
                        onChange={handleChange} 
                        placeholder="Enter type" 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Color</label>
                      <input 
                        type="text" 
                        name="color" 
                        value={formData.color} 
                        onChange={handleChange} 
                        placeholder="Color" 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>MV File No.</label>
                      <input 
                        type="text" 
                        name="mvFileNo" 
                        value={formData.mvFileNo} 
                        onChange={handleChange} 
                        placeholder="File no." 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Plate No.</label>
                      <input 
                        type="text" 
                        name="plateNo" 
                        value={formData.plateNo} 
                        onChange={handleChange} 
                        placeholder="Plate" 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                    <div>
                      <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Chassis No.</label>
                      <input 
                        type="text" 
                        name="serialChassisNo" 
                        value={formData.serialChassisNo} 
                        onChange={handleChange} 
                        placeholder="Chassis" 
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Motor No.</label>
                    <input 
                      type="text" 
                      name="motorNo" 
                      value={formData.motorNo} 
                      onChange={handleChange} 
                      placeholder="Enter motor number" 
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none'}} 
                    />
                  </div>
                </div>
              </>
            )}

            {/* STEP 2: Rates */}
            {currentStep === 2 && (
              <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
                <h3 style={{fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: '0 0 20px 0'}}>Insurance Rates Calculation</h3>
                <p style={{fontSize: '14px', color: '#6b7280', marginBottom: '20px'}}>Enter the premium amount. Other charges will be calculated automatically:</p>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px'}}>
                  <div>
                    <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Premium (Input)</label>
                    <input 
                      type="number" 
                      value={ratesData.premium}
                      onChange={(e) => setRatesData({...ratesData, premium: e.target.value})}
                      placeholder="0.00" 
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #1a5f3f', borderRadius: '8px', fontSize: '13px', outline: 'none', fontWeight: '600'}} 
                    />
                  </div>
                  <div>
                    <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Doc. Stamps (12.5%)</label>
                    <input 
                      type="number" 
                      value={rates.docStamps.toFixed(2)}
                      readOnly
                      placeholder="0.00" 
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f3f4f6'}} 
                    />
                  </div>
                  <div>
                    <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>E-VAT (12%)</label>
                    <input 
                      type="number" 
                      value={rates.eVat.toFixed(2)}
                      readOnly
                      placeholder="0.00" 
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f3f4f6'}} 
                    />
                  </div>
                  <div>
                    <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Local Govt Tax (0.5%)</label>
                    <input 
                      type="number" 
                      value={rates.lgt.toFixed(2)}
                      readOnly
                      placeholder="0.00" 
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f3f4f6'}} 
                    />
                  </div>
                  <div>
                    <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Auth. Fee (Fixed)</label>
                    <input 
                      type="number" 
                      value={rates.authFee.toFixed(2)}
                      readOnly
                      placeholder="0.00" 
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f3f4f6'}} 
                    />
                  </div>
                  <div>
                    <label style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Other Charges (Input)</label>
                    <input 
                      type="number" 
                      value={ratesData.otherCharges}
                      onChange={(e) => setRatesData({...ratesData, otherCharges: e.target.value})}
                      placeholder="0.00" 
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #1a5f3f', borderRadius: '8px', fontSize: '13px', outline: 'none', fontWeight: '600'}} 
                    />
                  </div>
                </div>

                <div style={{padding: '16px', backgroundColor: '#ffe4e6', borderRadius: '8px', borderLeft: '4px solid #ec4899'}}>
                  <p style={{fontSize: '12px', color: '#6b7280', margin: '0 0 8px 0'}}>Total Premium</p>
                  <p style={{fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: 0}}>₱{rates.total.toFixed(2)}</p>
                </div>
              </div>
            )}

            {/* STEP 3: Review */}
            {currentStep === 3 && (
              <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
                <h3 style={{fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: '0 0 20px 0'}}>Review Your Information</h3>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px'}}>
                  <div style={{padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #1a5f3f'}}>
                    <p style={{fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 8px 0'}}>Assured</p>
                    <p style={{fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.assured || 'Not provided'}</p>
                  </div>
                  <div style={{padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #1a5f3f'}}>
                    <p style={{fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 8px 0'}}>Address</p>
                    <p style={{fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.address || 'Not provided'}</p>
                  </div>
                  <div style={{padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #1a5f3f'}}>
                    <p style={{fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 8px 0'}}>COC Number</p>
                    <p style={{fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.cocNumber || 'Not provided'}</p>
                  </div>
                  <div style={{padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #1a5f3f'}}>
                    <p style={{fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 8px 0'}}>Policy Number</p>
                    <p style={{fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.policyNumber || 'Not provided'}</p>
                  </div>
                </div>

                <div style={{padding: '16px', backgroundColor: '#ecfdf5', borderRadius: '8px', borderLeft: '3px solid #1a5f3f', marginBottom: '24px'}}>
                  <p style={{fontSize: '13px', color: '#165035', margin: 0}}>
                    ✓ All required information has been collected. Click <strong>Submit</strong> to finalize the underwriting process.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px'}}>
          <button 
            onClick={handleBack}
            style={{
              padding: '12px 28px',
              backgroundColor: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
          >
            Cancel
          </button>

          {currentStep > 1 && (
            <button 
              onClick={handlePrevious}
              style={{
                padding: '12px 28px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            >
              Previous
            </button>
          )}

          <button 
            onClick={handleNext}
            disabled={currentStep === 1 && !isQuickReferenceComplete()}
            style={{
              padding: '12px 28px',
              backgroundColor: (currentStep === 1 && !isQuickReferenceComplete()) ? '#d1d5db' : '#1a5f3f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: (currentStep === 1 && !isQuickReferenceComplete()) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (currentStep === 1 && !isQuickReferenceComplete()) return;
              e.target.style.backgroundColor = '#165035';
            }}
            onMouseLeave={(e) => {
              if (currentStep === 1 && !isQuickReferenceComplete()) return;
              e.target.style.backgroundColor = '#1a5f3f';
            }}
          >
            {currentStep === 1 ? 'Continue to Rates' : currentStep === 2 ? 'Go to Review' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
