
/**
 * Utility functions for early access management
 */

// The valid early access code (case sensitive)
export const VALID_EARLY_ACCESS_CODE = 'F1RSTDROP';

// Check if user has early access based on localStorage
export const hasEarlyAccess = (): boolean => {
  return localStorage.getItem('thriftsc-early-access') === 'true';
};

// Set early access in localStorage
export const setEarlyAccess = (): void => {
  localStorage.setItem('thriftsc-early-access', 'true');
};

// Validate an early access code
export const validateEarlyAccessCode = (code: string): boolean => {
  return code === VALID_EARLY_ACCESS_CODE;
};

// Check if launch time has passed
export const isAfterLaunchTime = (): boolean => {
  const launchTime = new Date();
  launchTime.setDate(launchTime.getDate() + 1);
  launchTime.setHours(9, 0, 0, 0);
  
  return new Date() >= launchTime;
};

// Get launch date as a formatted string
export const getLaunchDateFormatted = (): string => {
  const launchTime = new Date();
  launchTime.setDate(launchTime.getDate() + 1);
  launchTime.setHours(9, 0, 0, 0);
  
  // Format: "April 10, 2025 at 9:00 AM"
  return launchTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) + ' at 9:00 AM';
};
