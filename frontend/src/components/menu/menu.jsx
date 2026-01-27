import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/menu.css';

function Menu() {
  const navigate = useNavigate();
  
  // Initialize formData from localStorage
  const [formData, setFormData] = useState(() => {
    try {
      const savedFormData = localStorage.getItem('menuFormData');
      return savedFormData ? JSON.parse(savedFormData) : {
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
      };
    } catch (error) {
      return {
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
      };
    }
  });

  // Initialize currentStep from localStorage
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const savedStep = localStorage.getItem('menuCurrentStep');
      return savedStep ? parseInt(savedStep) : 1;
    } catch (error) {
      return 1;
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [ratesData, setRatesData] = useState(() => {
    try {
      const savedRatesData = localStorage.getItem('menuRatesData');
      return savedRatesData ? JSON.parse(savedRatesData) : {
        premium: '',
        otherCharges: ''
      };
    } catch (error) {
      return {
        premium: '',
        otherCharges: ''
      };
    }
  });

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('menuFormData', JSON.stringify(formData));
  }, [formData]);

  // Save currentStep to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('menuCurrentStep', currentStep.toString());
  }, [currentStep]);

  // Save ratesData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('menuRatesData', JSON.stringify(ratesData));
  }, [ratesData]);

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const inputBaseStyle = {
    width: '100%',
    padding: '11px 14px',
    border: '1.5px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '13px',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: '#ffffff'
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#1E6B47', padding: '32px 16px'}}>
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
          backgroundColor: toast.type === 'success' ? '#2D5016' : '#dc2626',
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
      <div style={{maxWidth: '1400px', margin: '0 auto', marginBottom: '32px'}}>
        <div style={{background: 'transparent', borderRadius: '16px', padding: '40px', boxShadow: '0 8px 24px rgba(45, 80, 22, 0.12)', border: 'none', position: 'relative', overflow: 'visible'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', position: 'relative', zIndex: 1, flexDirection: 'column', textAlign: 'center'}}>
            <div style={{flexShrink: 0, backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img src="/images/alpha.png" alt="Alpha Logo" style={{height: '65px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))'}} />
            </div>
            <div style={{flex: 1}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', justifyContent: 'center'}}>
                <h1 style={{fontSize: '40px', fontWeight: '900', color: '#ffffff', margin: 0, letterSpacing: '-0.8px'}}>Underwriting System Menu</h1>
              </div>
              <p style={{fontSize: '16px', color: '#e5e7eb', margin: 0, fontWeight: '500', letterSpacing: '0.3px'}}>Motor Car Insurance · Complete the form to proceed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Progress Indicator - Full Width */}
      <div style={{width: '100%', paddingTop: '16px', paddingBottom: '16px', marginBottom: '24px'}} role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3} aria-label={`Step ${currentStep} of 3`}>
        <div style={{maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '16px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0', position: 'relative', width: '100%', maxWidth: '500px'}}>
            {[{label: 'Info', step: 1}, {label: 'Rates', step: 2}, {label: 'Review', step: 3}].map((step, idx) => (
              <div key={idx} style={{display: 'flex', alignItems: 'center', flex: 1, position: 'relative'}}>
                {/* Timeline Line */}
                {idx > 0 && (
                  <div style={{
                    position: 'absolute',
                    left: '-50%',
                    top: '20px',
                    width: '100%',
                    height: '4px',
                    backgroundColor: step.step - 1 < currentStep ? '#2D5016' : '#e5e7eb',
                    transition: 'background-color 0.4s ease',
                    zIndex: 0
                  }} />
                )}
                
                {/* Step Circle */}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1, width: '100%'}}>
                  <button
                    onClick={() => handleStepClick(step.step)}
                    disabled={step.step >= currentStep}
                    aria-label={`Go to step ${step.step}: ${step.label}`}
                    aria-current={step.step === currentStep ? 'step' : undefined}
                    style={{
                      width: step.step === currentStep ? '56px' : '48px',
                      height: step.step === currentStep ? '56px' : '48px',
                      borderRadius: '50%',
                      backgroundColor: step.step <= currentStep ? '#FFDB58' : '#f0f0f0',
                      color: step.step <= currentStep ? '#2D5016' : '#9ca3af',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: step.step === currentStep ? '16px' : '14px',
                      cursor: step.step < currentStep ? 'pointer' : 'default',
                      transition: 'all 0.3s ease',
                      border: step.step === currentStep ? '3px solid #2D5016' : '2px solid transparent',
                      boxShadow: step.step === currentStep ? '0 6px 20px rgba(255, 219, 88, 0.3)' : step.step <= currentStep ? '0 3px 10px rgba(255, 219, 88, 0.2)' : 'none',
                      ...((step.step === currentStep) && inputFocusStyle)
                    }}
                    onMouseEnter={(e) => {
                      if (step.step < currentStep) {
                        e.target.style.backgroundColor = '#FFC93D';
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = '0 8px 24px rgba(255, 219, 88, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (step.step < currentStep) {
                        e.target.style.backgroundColor = '#FFDB58';
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 3px 10px rgba(255, 219, 88, 0.2)';
                      }
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 4px rgba(255, 219, 88, 0.6)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = step.step === currentStep ? '0 6px 20px rgba(255, 219, 88, 0.3)' : step.step <= currentStep ? '0 3px 10px rgba(255, 219, 88, 0.2)' : 'none';
                    }}
                  >
                    {step.step < currentStep ? '✓' : step.step}
                  </button>
                  <span style={{
                    fontSize: step.step === currentStep ? '14px' : '13px',
                    fontWeight: step.step === currentStep ? '800' : '700',
                    color: step.step <= currentStep ? '#FFDB58' : '#9ca3af',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}>
                    {step.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: currentStep === 2 || currentStep === 3 ? '1fr' : 'minmax(280px, 1fr) 2fr', gap: '20px'}}>
          {/* Left Sidebar - Hidden on Rates and Review Steps */}
          {currentStep !== 2 && currentStep !== 3 && (
          <div style={stepTransitionStyle}>
            <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', border: '1px solid #e5e7eb'}} onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 22, 0.1)';
              e.currentTarget.style.borderColor = '#d1d5db';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                <div style={{width: '4px', height: '24px', backgroundColor: '#2D5016', borderRadius: '2px'}}></div>
                <h3 style={{fontSize: '13px', fontWeight: '700', color: '#2D5016', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Quick Reference</h3>
              </div>
              
              {/* Completion Tracking */}
              <div style={{marginBottom: '16px', paddingBottom: '16px', borderBottom: '2px solid #1a5f3f', display: 'flex', alignItems: 'center', gap: '10px'}} aria-live="polite" aria-label={`Quick Reference completion status: ${completionPercentage === 100 ? 'Complete' : 'Incomplete'}`}>
                <div style={{width: '28px', height: '28px', borderRadius: '50%', backgroundColor: completionPercentage === 100 ? '#1a5f3f' : '#e5e7eb', color: completionPercentage === 100 ? 'white' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', transition: 'all 0.3s ease'}} aria-hidden="true">
                  {completionPercentage === 100 ? '✓' : '○'}
                </div>
                <span style={{fontSize: '13px', color: completionPercentage === 100 ? '#1a5f3f' : '#d1d5db', fontWeight: '600', transition: 'all 0.3s ease'}}>
                  {completionPercentage === 100 ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              
              <div style={{marginBottom: '16px'}}>
                <label htmlFor="assured-input" style={{fontSize: '11px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Assured <span style={{color: '#ef4444'}}>*</span></label>
                <input 
                  id="assured-input"
                  type="text" 
                  name="assured"
                  value={formData.assured}
                  onChange={handleChange}
                  placeholder="Enter assured name"
                  aria-label="Assured name - required"
                  aria-required="true"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1a5f3f';
                    e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                    e.target.style.backgroundColor = '#f8fdf9';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = '';
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.backgroundColor = '#ffffff';
                  }}
                  style={inputBaseStyle}
                />
              </div>

              <div style={{marginBottom: '16px'}}>
                <label htmlFor="address-input" style={{fontSize: '11px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Address <span style={{color: '#ef4444'}}>*</span></label>
                <input 
                  id="address-input"
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  aria-label="Address - required"
                  aria-required="true"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1a5f3f';
                    e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                    e.target.style.backgroundColor = '#f8fdf9';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = '';
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.backgroundColor = '#ffffff';
                  }}
                  style={inputBaseStyle}
                />
              </div>

              <div style={{display: 'flex', gap: '12px'}}>
                <div style={{flex: 1}}>
                  <label htmlFor="coc-number-input" style={{fontSize: '11px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.3px'}}>COC Number <span style={{color: '#ef4444'}}>*</span></label>
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
                    onFocus={(e) => {
                      e.target.style.borderColor = '#1a5f3f';
                      e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                      e.target.style.backgroundColor = '#f8fdf9';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '';
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.backgroundColor = '#ffffff';
                    }}
                    style={inputBaseStyle}
                  />
                </div>

                <div style={{flex: 1}}>
                  <label htmlFor="or-number-input" style={{fontSize: '11px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.3px'}}>OR Number</label>
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
                    onFocus={(e) => {
                      e.target.style.borderColor = '#1a5f3f';
                      e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                      e.target.style.backgroundColor = '#f8fdf9';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '';
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.backgroundColor = '#ffffff';
                    }}
                    style={inputBaseStyle}
                  />
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Right Main Content */}
          <div>
            {/* STEP 1: Info */}
            {currentStep === 1 && (
              <div style={stepTransitionStyle}>
                {/* Section 1: Policy Information */}
                <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.3s ease', border: '1px solid #e5e7eb'}} onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 22, 0.08)';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #1a5f3f', position: 'relative'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{width: '4px', height: '24px', backgroundColor: '#2D5016', borderRadius: '2px'}}></div>
                      <h3 style={{fontSize: '13px', fontWeight: '700', color: '#1f2937', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Policy Information</h3>
                    </div>
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
                      <select id="type-select" name="cType" value={formData.cType} onChange={handleChange} aria-label="Policy type" onFocus={(e) => {
                        e.target.style.borderColor = '#1a5f3f';
                        e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                        e.target.style.backgroundColor = '#f8fdf9';
                      }} onBlur={(e) => {
                        e.target.style.boxShadow = '';
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.backgroundColor = '#ffffff';
                      }} style={inputBaseStyle}>
                        <option>Select Type</option>
                        <option>MC</option>
                        <option>PC</option>
                        <option>CV</option>
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
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1a5f3f';
                          e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                          e.target.style.backgroundColor = '#f8fdf9';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.backgroundColor = '#ffffff';
                        }}
                        style={inputBaseStyle}
                      />
                    </div>
                    <div>
                      <label htmlFor="year-select" style={{fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px'}}>Year</label>
                      <select id="year-select" aria-label="Policy year" onFocus={(e) => {
                        e.target.style.borderColor = '#1a5f3f';
                        e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                        e.target.style.backgroundColor = '#f8fdf9';
                      }} onBlur={(e) => {
                        e.target.style.boxShadow = '';
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.backgroundColor = '#ffffff';
                      }} style={inputBaseStyle}>
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
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1a5f3f';
                          e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                          e.target.style.backgroundColor = '#f8fdf9';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.backgroundColor = '#ffffff';
                        }}
                        style={inputBaseStyle}
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
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1a5f3f';
                          e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                          e.target.style.backgroundColor = '#f8fdf9';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.backgroundColor = '#ffffff';
                        }}
                        style={inputBaseStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Insurance Period */}
                <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.3s ease', border: '1px solid #e5e7eb'}} onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 22, 0.08)';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #1a5f3f'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{width: '4px', height: '24px', backgroundColor: '#2D5016', borderRadius: '2px'}}></div>
                      <h3 style={{fontSize: '14px', fontWeight: '700', color: '#1f2937', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Insurance Period</h3>
                    </div>
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
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1a5f3f';
                          e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                          e.target.style.backgroundColor = '#f8fdf9';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.backgroundColor = '#ffffff';
                        }}
                        style={inputBaseStyle}
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
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1a5f3f';
                          e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                          e.target.style.backgroundColor = '#f8fdf9';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.backgroundColor = '#ffffff';
                        }}
                        style={inputBaseStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Vehicle Details */}
                <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.3s ease', border: '1px solid #e5e7eb'}} onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 22, 0.08)';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #1a5f3f'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{width: '4px', height: '24px', backgroundColor: '#2D5016', borderRadius: '2px'}}></div>
                      <h3 style={{fontSize: '14px', fontWeight: '700', color: '#1f2937', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Vehicle Details</h3>
                    </div>
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
              <div style={{...stepTransitionStyle, backgroundColor: 'white', borderRadius: '12px', padding: '32px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', maxWidth: '900px', margin: '0 auto 24px', transition: 'all 0.3s ease', border: '1px solid #e5e7eb'}} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 22, 0.08)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
              }}>
                <h3 style={{fontSize: '22px', fontWeight: '700', color: '#2D5016', margin: '0 0 24px 0', textAlign: 'center'}}>Insurance Rates Calculation</h3>
                <p style={{fontSize: '15px', color: '#6b7280', marginBottom: '28px', textAlign: 'center'}}>Enter the premium amount. Other charges will be calculated automatically:</p>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px'}}>
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
                      onFocus={(e) => {
                        e.target.style.borderColor = '#1a5f3f';
                        e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                        e.target.style.backgroundColor = '#f8fdf9';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '';
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.backgroundColor = '#ffffff';
                      }}
                      style={{...inputBaseStyle, fontWeight: '600', borderColor: '#1a5f3f'}}
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
                      style={{...inputBaseStyle, backgroundColor: '#f8fafc', borderColor: '#d1d5db'}}
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
                      style={{...inputBaseStyle, backgroundColor: '#f8fafc', borderColor: '#d1d5db'}}
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
                      style={{...inputBaseStyle, backgroundColor: '#f8fafc', borderColor: '#d1d5db'}}
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
                      style={{...inputBaseStyle, backgroundColor: '#f8fafc', borderColor: '#d1d5db'}}
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
                      onFocus={(e) => {
                        e.target.style.borderColor = '#1a5f3f';
                        e.target.style.boxShadow = '0 0 0 3px rgba(26, 95, 63, 0.12)';
                        e.target.style.backgroundColor = '#f8fdf9';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '';
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.backgroundColor = '#ffffff';
                      }}
                      style={{...inputBaseStyle, fontWeight: '600', borderColor: '#1a5f3f'}}
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
              <div style={{...stepTransitionStyle, backgroundColor: 'white', borderRadius: '12px', padding: '32px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', maxWidth: '900px', margin: '0 auto 24px', transition: 'all 0.3s ease', border: '1px solid #e5e7eb'}} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 22, 0.08)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
              }}>
                <h3 style={{fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: '0 0 24px 0', textAlign: 'center', paddingBottom: '16px', borderBottom: '2px solid #5A8C3A'}}>Review Your Information</h3>
                
                {/* Quick Reference Summary */}
                <div style={{marginBottom: '20px', paddingBottom: '0px', borderBottom: 'none', backgroundColor: 'transparent', borderRadius: '8px', padding: '0px'}}>
                  <h4 style={{fontSize: '12px', fontWeight: '700', color: '#2D5016', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Quick Reference</h4>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                    <div style={{padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '2px solid #5A8C3A', boxShadow: '0 1px 3px rgba(45, 80, 22, 0.1)'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 4px 0'}}>Assured</p>
                      <p style={{fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.assured || '-'}</p>
                    </div>
                    <div style={{padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '2px solid #5A8C3A', boxShadow: '0 1px 3px rgba(45, 80, 22, 0.1)'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 4px 0'}}>Address</p>
                      <p style={{fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.address || '-'}</p>
                    </div>
                    <div style={{padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '2px solid #5A8C3A', boxShadow: '0 1px 3px rgba(45, 80, 22, 0.1)'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 4px 0'}}>COC #</p>
                      <p style={{fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.cocNumber || '-'}</p>
                    </div>
                    <div style={{padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '2px solid #5A8C3A', boxShadow: '0 1px 3px rgba(45, 80, 22, 0.1)'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 4px 0'}}>OR #</p>
                      <p style={{fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.orNumber || '-'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Section 1: Policy Information */}
                <div style={{marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb'}}>
                  <h4 style={{fontSize: '12px', fontWeight: '700', color: '#2D5016', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Policy Information</h4>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px'}}>
                    <div style={{padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 4px 0'}}>Type</p>
                      <p style={{fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.cType || '-'}</p>
                    </div>
                    <div style={{padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 4px 0'}}>Policy #</p>
                      <p style={{fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.policyNumber || '-'}</p>
                    </div>
                    <div style={{padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 4px 0'}}>Issued</p>
                      <p style={{fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.dateIssued || '-'}</p>
                    </div>
                    <div style={{padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 4px 0'}}>Received</p>
                      <p style={{fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.dateReceived || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Insurance Period */}
                <div style={{marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb'}}>
                  <h4 style={{fontSize: '11px', fontWeight: '700', color: '#2D5016', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Insurance Period</h4>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
                    <div style={{padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 3px 0'}}>From</p>
                      <p style={{fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.insuranceFromDate ? `${formData.insuranceFromDate} ${formData.insuranceFromTime}` : '-'}</p>
                    </div>
                    <div style={{padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 3px 0'}}>To</p>
                      <p style={{fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.insuranceToDate ? `${formData.insuranceToDate} ${formData.insuranceToTime}` : '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Vehicle Details */}
                <div style={{marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb'}}>
                  <h4 style={{fontSize: '11px', fontWeight: '700', color: '#2D5016', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Vehicle Details</h4>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px'}}>
                    <div style={{padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 3px 0'}}>Model</p>
                      <p style={{fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.model || '-'}</p>
                    </div>
                    <div style={{padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 3px 0'}}>Make</p>
                      <p style={{fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.make || '-'}</p>
                    </div>
                    <div style={{padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 3px 0'}}>Body Type</p>
                      <p style={{fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.bodyType || '-'}</p>
                    </div>
                    <div style={{padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 3px 0'}}>Color</p>
                      <p style={{fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.color || '-'}</p>
                    </div>
                  </div>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px'}}>
                    <div style={{padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 3px 0'}}>MV File</p>
                      <p style={{fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.mvFileNo || '-'}</p>
                    </div>
                    <div style={{padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 3px 0'}}>Plate</p>
                      <p style={{fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.plateNo || '-'}</p>
                    </div>
                    <div style={{padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 3px 0'}}>Chassis</p>
                      <p style={{fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.serialChassisNo || '-'}</p>
                    </div>
                    <div style={{padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A'}}>
                      <p style={{fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', margin: '0 0 3px 0'}}>Motor</p>
                      <p style={{fontSize: '12px', fontWeight: '600', color: '#1f2937', margin: 0}}>{formData.motorNo || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Insurance Rates */}
                <div style={{marginBottom: '12px'}}>
                  <h4 style={{fontSize: '11px', fontWeight: '700', color: '#2D5016', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Rates</h4>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', gap: '6px', marginBottom: '8px'}}>
                    <div style={{padding: '6px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A', textAlign: 'center'}}>
                      <p style={{fontSize: '8px', color: '#6b7280', fontWeight: '600', margin: '0 0 2px 0'}}>Premium</p>
                      <p style={{fontSize: '11px', fontWeight: '700', color: '#2D5016', margin: 0}}>₱{rates.premium.toFixed(2)}</p>
                    </div>
                    <div style={{padding: '6px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A', textAlign: 'center'}}>
                      <p style={{fontSize: '8px', color: '#6b7280', fontWeight: '600', margin: '0 0 2px 0'}}>Stamps</p>
                      <p style={{fontSize: '11px', fontWeight: '700', color: '#2D5016', margin: 0}}>₱{rates.docStamps.toFixed(2)}</p>
                    </div>
                    <div style={{padding: '6px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A', textAlign: 'center'}}>
                      <p style={{fontSize: '8px', color: '#6b7280', fontWeight: '600', margin: '0 0 2px 0'}}>VAT</p>
                      <p style={{fontSize: '11px', fontWeight: '700', color: '#2D5016', margin: 0}}>₱{rates.eVat.toFixed(2)}</p>
                    </div>
                    <div style={{padding: '6px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A', textAlign: 'center'}}>
                      <p style={{fontSize: '8px', color: '#6b7280', fontWeight: '600', margin: '0 0 2px 0'}}>LGT</p>
                      <p style={{fontSize: '11px', fontWeight: '700', color: '#2D5016', margin: 0}}>₱{rates.lgt.toFixed(2)}</p>
                    </div>
                    <div style={{padding: '6px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A', textAlign: 'center'}}>
                      <p style={{fontSize: '8px', color: '#6b7280', fontWeight: '600', margin: '0 0 2px 0'}}>Fee</p>
                      <p style={{fontSize: '11px', fontWeight: '700', color: '#2D5016', margin: 0}}>₱{rates.authFee.toFixed(2)}</p>
                    </div>
                    <div style={{padding: '6px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '2px solid #5A8C3A', textAlign: 'center'}}>
                      <p style={{fontSize: '8px', color: '#6b7280', fontWeight: '600', margin: '0 0 2px 0'}}>Other</p>
                      <p style={{fontSize: '11px', fontWeight: '700', color: '#2D5016', margin: 0}}>₱{rates.otherCharges.toFixed(2)}</p>
                    </div>
                  </div>
                  <div style={{padding: '10px', backgroundColor: '#dcfce7', borderRadius: '6px', borderLeft: '3px solid #2D5016', textAlign: 'center'}}>
                    <p style={{fontSize: '10px', color: '#165035', margin: '0 0 3px 0', fontWeight: '600'}}>TOTAL</p>
                    <p style={{fontSize: '18px', fontWeight: '800', color: '#1a3a0f', margin: 0}}>₱{rates.total.toFixed(2)}</p>
                  </div>
                </div>

                <div style={{padding: '10px', backgroundColor: '#ecfdf5', borderRadius: '6px', borderLeft: '2px solid #2D5016'}}>
                  <p style={{fontSize: '11px', color: '#165035', margin: 0}}>
                    ✓ Ready to submit. Click <strong>Submit</strong> to finalize.
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
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 3px rgba(209, 213, 219, 0.5)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '';
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
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#d1d5db';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#e5e7eb';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '';
            }}
          >
            Cancel
          </button>

          {currentStep > 1 && (
            <button 
              onClick={handlePrevious}
              aria-label={`Go back to previous step from step ${currentStep}`}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 3px rgba(243, 244, 246, 0.5)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
              }}
              style={{
                padding: '12px 28px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1.5px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e5e7eb';
                e.target.style.borderColor = '#9ca3af';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.borderColor = '#d1d5db';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '';
              }}
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
                e.target.style.boxShadow = '0 0 0 4px rgba(255, 219, 88, 0.4)';
              }
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '';
            }}
            style={{
              padding: '12px 28px',
              backgroundColor: ((currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting) ? '#d1d5db' : '#FFDB58',
              color: '#2D5016',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: ((currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if ((currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting) return;
              e.target.style.backgroundColor = '#FFC93D';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(255, 219, 88, 0.3)';
            }}
            onMouseLeave={(e) => {
              if ((currentStep === 1 && !isQuickReferenceComplete()) || isSubmitting) return;
              e.target.style.backgroundColor = '#FFDB58';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '';
            }}
          >
            {isSubmitting && (
              <div style={{
                width: '16px',
                height: '16px',
                border: '3px solid rgba(45, 80, 22, 0.2)',
                borderRadius: '50%',
                borderTopColor: '#2D5016',
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
