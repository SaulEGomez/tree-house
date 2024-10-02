'use client';
import React, { useEffect, useState } from 'react';

const BaseSettings = ({ baseSettings }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (baseSettings) {
      Object.keys(baseSettings).forEach((key) => {
        const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        document.documentElement.style.setProperty(`--${kebabKey}`, baseSettings[key]);
      });
      setLoading(false);
    }
  }, [baseSettings]);

  if (loading) {
    return (
      <div className='loader-container'>
        <div className="loader" />
      </div>
    );
  }

  return null;
};

export default BaseSettings;
