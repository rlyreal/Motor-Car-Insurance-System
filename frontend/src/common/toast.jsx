import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import './toast.css';

const Toast = ({ message, type = 'success', onClose, duration = 3000, isLoading = false, showProgress = false }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, isLoading]);

  useEffect(() => {
    if (showProgress && duration) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - (100 / (duration / 100)), 0));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [showProgress, duration]);

  const bgColor = isLoading ? '#3b82f6' : type === 'success' ? '#22c55e' : '#ef4444';
  const icon = isLoading ? (
    <div style={{ animation: 'spin 1s linear infinite' }}>
      <div style={{
        width: '20px',
        height: '20px',
        border: '2px solid white',
        borderTopColor: 'transparent',
        borderRadius: '50%'
      }}></div>
    </div>
  ) : type === 'success' ? (
    <FaCheckCircle />
  ) : (
    <FaExclamationCircle />
  );

  return (
    <div className="toast-container" style={{ backgroundColor: bgColor }}>
      <div className="toast-content">
        <div className="toast-icon">{icon}</div>
        <div className="toast-message">{message}</div>
        {!isLoading && !showProgress && (
          <button onClick={onClose} className="toast-close">
            <FaTimes />
          </button>
        )}
      </div>
      {(isLoading || showProgress) && (
        <div className="toast-progress-bar">
          <div 
            className="toast-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Toast;
