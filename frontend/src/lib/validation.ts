"use client";

/**
 * Shared validation logic for forms across the application.
 * Matches exactly the requirements of the ConsultationSection.
 */

export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validates Bulgarian phone numbers.
 * Requirement: Exactly 7 digits.
 */
export const validateBGPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^\d{7}$/.test(cleaned);
};

export const validateName = (name: string): boolean => {
    return name.trim().length > 0;
};

export const formatPhoneForSubmit = (phone: string): string => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return `+359${cleaned}`;
};
