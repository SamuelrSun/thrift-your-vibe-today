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
  const now = new Date();
  const launchTime = new Date();
  
  // Set launch time to 11:00 AM today
  launchTime.setHours(11, 0, 0, 0);
  
  // Precisely check if current time is at or after 11:00 AM
  return now >= launchTime;
};

// Get launch date as a formatted string
export const getLaunchDateFormatted = (): string => {
  const launchTime = new Date();
  // Set to 11:00 AM today (April 9th)
  launchTime.setHours(11, 0, 0, 0);
  
  // Format: "April 9, 2025 at 11:00 AM"
  return launchTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) + ' at 11:00 AM';
};

// The getLaunchTime function in the LaunchPage will also need to be updated
