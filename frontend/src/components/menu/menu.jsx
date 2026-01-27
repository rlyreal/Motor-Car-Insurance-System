import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/record.css';

function Menu() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
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
    orNumber: '',
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

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleNext = () => {
    if (currentStep === 1 && isQuickReferenceComplete()) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        try {
          console.log('Form submitted:', formData);
          setIsSubmitting(false);
          showToast('Form submitted successfully!', 'success');
          
          setTimeout(() => {
            navigate('/records');
          }, 2000);
        } catch (error) {
          setIsSubmitting(false);
          showToast('Error submitting form. Please try again.', 'error');
        }
      }, 1500);
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

  const focusStyle = {
    outline: 'none',
    borderColor: '#1a5f3f',
    boxShadow: '0 0 0 3px rgba(26, 95, 63, 0.1)',
    transition: 'all 0.2s'
  };

  const stepTransitionStyle = {
    animation: 'fadeIn 0.4s ease-in-out',
    transition: 'opacity 0.4s ease-in-out'
  };

  const inputFocusStyle = {
    ...focusStyle,
    border: '2px solid #1a5f3f'
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8fafc', padding: '32px 16px'}}>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>

      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '16px 24px',
          backgroundColor: toast.type === 'success' ? '#1a5f3f' : '#dc2626',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          animation: 'slideInDown 0.4s ease-out',
          zIndex: 1000,
          maxWidth: '400px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{fontSize: '18px'}}>
              {toast.type === 'success' ? '✓' : '✕'}
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      
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
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px'}} role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3} aria-label={`Step ${currentStep} of 3`}>
            {[
              {label: 'Info', step: 1},
              {label: 'Rates', step: 2},
              {label: 'Review', step: 3}
            ].map((step, idx) => (
              <div key={idx} style={{display: 'flex', alignItems: 'center', flex: 1}}>
                <button
                  onClick={() => handleStepClick(step.step)}
                  disabled={step.step >= currentStep}
                  aria-label={`Go to step ${step.step}: ${step.label}`}
                  aria-current={step.step === currentStep ? 'step' : undefined}
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
                    transition: 'all 0.2s',
                    border: 'none',
                    ...((step.step === currentStep) && inputFocusStyle)
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
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {idx + 1}
                </button>
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
              <div style={{marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #1a5f3f', display: 'flex', alignItems: 'center', gap: '10px'}} aria-live="polite" aria-label={`Quick Reference completion status: ${completionPercentage === 100 ? 'Complete' : 'Incomplete'}`}>
                <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: completionPercentage === 100 ? '#1a5f3f' : '#e5e7eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700'}} aria-hidden="true">
                  {completionPercentage === 100 ? '✓' : '○'}
                </div>
                <span style={{fontSize: '13px', color: completionPercentage === 100 ? '#1a5f3f' : '#d1d5db', fontWeight: '600'}}>
                  {completionPercentage === 100 ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              
              <div style={{marginBottom: '24px'}}>
                <label htmlFor="assured-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px', textTransform: 'uppercase'}}>Assured <span style={{color: '#ef4444'}}>*</span></label>
                <input 
                  id="assured-input"
                  type="text" 
                  name="assured"
                  value={formData.assured}
                  onChange={handleChange}
                  placeholder="Enter assured name"
                  aria-label="Assured name - required"
                  aria-required="true"
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.boxShadow = '';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                  style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                />
              </div>

              <div style={{marginBottom: '24px'}}>
                <label htmlFor="address-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px', textTransform: 'uppercase'}}>Address <span style={{color: '#ef4444'}}>*</span></label>
                <input 
                  id="address-input"
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  aria-label="Address - required"
                  aria-required="true"
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.boxShadow = '';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                  style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                />
              </div>

              <div style={{display: 'flex', gap: '16px'}}>
                <div style={{flex: 1}}>
                  <label htmlFor="coc-number-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px', textTransform: 'uppercase'}}>COC Number <span style={{color: '#ef4444'}}>*</span></label>
                  <input 
                    id="coc-number-input"
                    type="text" 
                    name="cocNumber"
                    value={formData.cocNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setFormData(prev => ({ ...prev, cocNumber: value }));
                    }}
                    placeholder="Enter COC no."
                    aria-label="COC Number - numbers only - required"
                    aria-required="true"
                    inputMode="numeric"
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '';
                      e.target.style.borderColor = '#e5e7eb';
                    }}
                    style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                  />
                </div>

                <div style={{flex: 1}}>
                  <label htmlFor="or-number-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px', textTransform: 'uppercase'}}>OR Number</label>
                  <input 
                    id="or-number-input"
                    type="text" 
                    name="orNumber"
                    value={formData.orNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setFormData(prev => ({ ...prev, orNumber: value }));
                    }}
                    placeholder="Enter OR no."
                    aria-label="OR Number - numbers only"
                    inputMode="numeric"
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '';
                      e.target.style.borderColor = '#e5e7eb';
                    }}
                    style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div>
            {/* STEP 1: Info */}
            {currentStep === 1 && (
              <div style={stepTransitionStyle}>
                {/* Section 1: Policy Information */}
                <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #1a5f3f'}}>
                    <h3 style={{fontSize: '14px', fontWeight: '700', color: '#1f2937', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Policy Information</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}} aria-live="polite" aria-label={`Policy Information: ${isPolicyInfoComplete() ? 'Complete' : 'Incomplete'}`}>
                      <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: isPolicyInfoComplete() ? '#1a5f3f' : '#e5e7eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700'}} aria-hidden="true">
                        {isPolicyInfoComplete() ? '✓' : '○'}
                      </div>
                      <span style={{fontSize: '12px', color: isPolicyInfoComplete() ? '#1a5f3f' : '#d1d5db', fontWeight: '600'}}>
                        {isPolicyInfoComplete() ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: '80px 1fr 120px 150px 150px', gap: '16px', alignItems: 'flex-end'}}>
                    <div>
                      <label htmlFor="type-select" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Type</label>
                      <select id="type-select" aria-label="Policy type" onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)} onBlur={(e) => {
                        e.target.style.boxShadow = '';
                        e.target.style.borderColor = '#e5e7eb';
                      }} style={{width: '100%', padding: '10px 8px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}}>
                        <option>Select Type</option>
                        <option>MC</option>
                        <option>PC</option>
                        <option>UV</option>
                        <option>LTO</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="policy-number-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Policy Number <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="policy-number-input"
                        type="text" 
                        name="policyNumber"
                        value={formData.policyNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setFormData(prev => ({ ...prev, policyNumber: value }));
                        }}
                        placeholder="Policy number"
                        aria-label="Policy Number - numbers only - required"
                        aria-required="true"
                        inputMode="numeric"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                    <div>
                      <label htmlFor="year-select" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Year</label>
                      <select id="year-select" aria-label="Policy year" onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)} onBlur={(e) => {
                        e.target.style.boxShadow = '';
                        e.target.style.borderColor = '#e5e7eb';
                      }} style={{width: '100%', padding: '10px 8px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}}>
                        <option>Select</option>
                        <option>2026</option>
                        <option>2025</option>
                        <option>2024</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="date-issued-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Issued <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="date-issued-input"
                        type="date" 
                        name="dateIssued" 
                        value={formData.dateIssued} 
                        onChange={handleChange}
                        aria-label="Date issued - required"
                        aria-required="true"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                    <div>
                      <label htmlFor="date-received-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Received <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="date-received-input"
                        type="date" 
                        name="dateReceived" 
                        value={formData.dateReceived} 
                        onChange={handleChange}
                        aria-label="Date received - required"
                        aria-required="true"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Insurance Period */}
                <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #1a5f3f'}}>
                    <h3 style={{fontSize: '14px', fontWeight: '700', color: '#1f2937', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Insurance Period</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}} aria-live="polite" aria-label={`Insurance Period: ${isInsurancePeriodComplete() ? 'Complete' : 'Incomplete'}`}>
                      <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: isInsurancePeriodComplete() ? '#1a5f3f' : '#e5e7eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700'}} aria-hidden="true">
                        {isInsurancePeriodComplete() ? '✓' : '○'}
                      </div>
                      <span style={{fontSize: '12px', color: isInsurancePeriodComplete() ? '#1a5f3f' : '#d1d5db', fontWeight: '600'}}>
                        {isInsurancePeriodComplete() ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                    <div>
                      <label htmlFor="from-date-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>From Date <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="from-date-input"
                        type="date" 
                        name="insuranceFromDate" 
                        value={formData.insuranceFromDate} 
                        onChange={handleChange}
                        aria-label="Insurance from date - required"
                        aria-required="true"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                    <div>
                      <label htmlFor="to-date-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>To Date <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="to-date-input"
                        type="date" 
                        name="insuranceToDate" 
                        value={formData.insuranceToDate} 
                        onChange={handleChange}
                        aria-label="Insurance to date - required"
                        aria-required="true"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Vehicle Details */}
                <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #1a5f3f'}}>
                    <h3 style={{fontSize: '14px', fontWeight: '700', color: '#1f2937', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Vehicle Details</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}} aria-live="polite" aria-label={`Vehicle Details: ${isVehicleDetailsComplete() ? 'Complete' : 'Incomplete'}`}>
                      <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: isVehicleDetailsComplete() ? '#1a5f3f' : '#e5e7eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700'}} aria-hidden="true">
                        {isVehicleDetailsComplete() ? '✓' : '○'}
                      </div>
                      <span style={{fontSize: '12px', color: isVehicleDetailsComplete() ? '#1a5f3f' : '#d1d5db', fontWeight: '600'}}>
                        {isVehicleDetailsComplete() ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                    <div>
                      <label htmlFor="model-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Model <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="model-input"
                        type="text" 
                        name="model" 
                        value={formData.model} 
                        onChange={handleChange}
                        placeholder="Enter model"
                        aria-label="Vehicle model - required"
                        aria-required="true"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                    <div>
                      <label htmlFor="make-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Make <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="make-input"
                        type="text" 
                        name="make" 
                        value={formData.make} 
                        onChange={handleChange}
                        placeholder="Enter make"
                        aria-label="Vehicle make - required"
                        aria-required="true"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                    <div>
                      <label htmlFor="body-type-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Body Type <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="body-type-input"
                        type="text" 
                        name="bodyType" 
                        value={formData.bodyType} 
                        onChange={handleChange}
                        placeholder="Enter type"
                        aria-label="Vehicle body type - required"
                        aria-required="true"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                    <div>
                      <label htmlFor="color-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Color <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="color-input"
                        type="text" 
                        name="color" 
                        value={formData.color} 
                        onChange={handleChange}
                        placeholder="Color"
                        aria-label="Vehicle color - required"
                        aria-required="true"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                    <div>
                      <label htmlFor="mv-file-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>MV File No.</label>
                      <input 
                        id="mv-file-input"
                        type="text" 
                        name="mvFileNo" 
                        value={formData.mvFileNo} 
                        onChange={handleChange}
                        placeholder="File no."
                        aria-label="Motor vehicle file number"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                    <div>
                      <label htmlFor="plate-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Plate No. <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="plate-input"
                        type="text" 
                        name="plateNo" 
                        value={formData.plateNo} 
                        onChange={handleChange}
                        placeholder="Plate"
                        aria-label="License plate number - required"
                        aria-required="true"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                    <div>
                      <label htmlFor="chassis-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Chassis No. <span style={{color: '#ef4444'}}>*</span></label>
                      <input 
                        id="chassis-input"
                        type="text" 
                        name="serialChassisNo" 
                        value={formData.serialChassisNo} 
                        onChange={handleChange}
                        placeholder="Chassis"
                        aria-label="Chassis number - required"
                        aria-required="true"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                        style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="motor-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Motor No. <span style={{color: '#ef4444'}}>*</span></label>
                    <input 
                      id="motor-input"
                      type="text" 
                      name="motorNo" 
                      value={formData.motorNo} 
                      onChange={handleChange}
                      placeholder="Enter motor number"
                      aria-label="Motor number - required"
                      aria-required="true"
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '';
                        e.target.style.borderColor = '#e5e7eb';
                      }}
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', transition: 'all 0.2s'}} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Rates */}
            {currentStep === 2 && (
              <div style={{...stepTransitionStyle, backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
                <h3 style={{fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: '0 0 20px 0'}}>Insurance Rates Calculation</h3>
                <p style={{fontSize: '14px', color: '#6b7280', marginBottom: '20px'}}>Enter the premium amount. Other charges will be calculated automatically:</p>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px'}}>
                  <div>
                    <label htmlFor="premium-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Premium (Input)</label>
                    <input 
                      id="premium-input"
                      type="text" 
                      value={ratesData.premium}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, '');
                        setRatesData({...ratesData, premium: value});
                      }}
                      placeholder="0.00"
                      aria-label="Premium amount - numbers only"
                      inputMode="decimal"
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '';
                        e.target.style.borderColor = '#1a5f3f';
                      }}
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #1a5f3f', borderRadius: '8px', fontSize: '13px', outline: 'none', fontWeight: '600', transition: 'all 0.2s'}} 
                    />
                  </div>
                  <div>
                    <label htmlFor="doc-stamps-output" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Doc. Stamps (12.5%)</label>
                    <input 
                      id="doc-stamps-output"
                      type="number" 
                      value={rates.docStamps.toFixed(2)}
                      readOnly
                      placeholder="0.00"
                      aria-label="Doc stamps amount calculated"
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f3f4f6'}} 
                    />
                  </div>
                  <div>
                    <label htmlFor="evat-output" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>E-VAT (12%)</label>
                    <input 
                      id="evat-output"
                      type="number" 
                      value={rates.eVat.toFixed(2)}
                      readOnly
                      placeholder="0.00"
                      aria-label="E-VAT amount calculated"
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f3f4f6'}} 
                    />
                  </div>
                  <div>
                    <label htmlFor="lgt-output" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Local Govt Tax (0.5%)</label>
                    <input 
                      id="lgt-output"
                      type="number" 
                      value={rates.lgt.toFixed(2)}
                      readOnly
                      placeholder="0.00"
                      aria-label="Local government tax amount calculated"
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f3f4f6'}} 
                    />
                  </div>
                  <div>
                    <label htmlFor="auth-fee-output" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Auth. Fee (Fixed)</label>
                    <input 
                      id="auth-fee-output"
                      type="number" 
                      value={rates.authFee.toFixed(2)}
                      readOnly
                      placeholder="0.00"
                      aria-label="Authorization fee fixed amount"
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#f3f4f6'}} 
                    />
                  </div>
                  <div>
                    <label htmlFor="other-charges-input" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Other Charges (Input)</label>
                    <input 
                      id="other-charges-input"
                      type="text" 
                      value={ratesData.otherCharges}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, '');
                        setRatesData({...ratesData, otherCharges: value});
                      }}
                      placeholder="0.00"
                      aria-label="Other charges - numbers only"
                      inputMode="decimal"
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '';
                        e.target.style.borderColor = '#1a5f3f';
                      }}
                      style={{width: '100%', padding: '10px 12px', border: '1px solid #1a5f3f', borderRadius: '8px', fontSize: '13px', outline: 'none', fontWeight: '600', transition: 'all 0.2s'}} 
                    />
                  </div>
                </div>

                <div style={{padding: '16px', backgroundColor: '#dcfce7', borderRadius: '8px', borderLeft: '4px solid #1a5f3f'}} role="region" aria-label="Total premium amount summary">
                  <p style={{fontSize: '12px', color: '#6b7280', margin: '0 0 8px 0'}}>Total Premium</p>
                  <p style={{fontSize: '28px', fontWeight: '700', color: '#1a5f3f', margin: 0}} aria-live="polite">₱{rates.total.toFixed(2)}</p>
                </div>
              </div>
            )}

            {/* STEP 3: Review */}
            {currentStep === 3 && (
              <div style={{...stepTransitionStyle, backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
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
            aria-label="Cancel and return to records"
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => {
              e.target.style.boxShadow = '';
              e.target.style.backgroundColor = '#e5e7eb';
            }}
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
              aria-label={`Go back to previous step from step ${currentStep}`}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
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
            disabled={(currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting}
            aria-label={currentStep === 1 ? 'Continue to rates step' : currentStep === 2 ? 'Go to review step' : 'Submit form for processing'}
            aria-disabled={(currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting}
            onFocus={(e) => {
              if (!((currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting)) {
                Object.assign(e.target.style, inputFocusStyle);
              }
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '';
              e.target.style.backgroundColor = ((currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting) ? '#d1d5db' : '#1a5f3f';
            }}
            style={{
              padding: '12px 28px',
              backgroundColor: ((currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting) ? '#d1d5db' : '#1a5f3f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: ((currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if ((currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting) return;
              e.target.style.backgroundColor = '#165035';
            }}
            onMouseLeave={(e) => {
              if ((currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting) return;
              e.target.style.backgroundColor = '#1a5f3f';
            }}
          >
            {isSubmitting && (
              <div style={{
                width: '16px',
                height: '16px',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                borderTopColor: 'white',
                animation: 'spin 0.8s linear infinite'
              }}></div>
            )}
            {isSubmitting 
              ? 'Submitting...' 
              : currentStep === 1 ? 'Continue to Rates' : currentStep === 2 ? 'Go to Review' : 'Submit'}
          </button>
        </div>
        
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Menu;
