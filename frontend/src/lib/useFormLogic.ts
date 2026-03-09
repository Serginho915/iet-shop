"use client";

import { useState, useCallback, useEffect } from "react";
import { validateEmail, validateBGPhone, validateName, formatPhoneForSubmit } from "./validation";
import { submitConsultation } from "./api";

interface FormState {
    name: string;
    email: string;
    phone: string;
    interested: number;
    privacyAccepted: boolean;
}

interface FormErrors {
    name: false | true;
    email: false | true;
    phone: false | true;
    interested: false | true;
    privacy: false | true;
}

export const useFormLogic = (initialInterested: number = 0, requireInterested: boolean = true) => {
    const [formData, setFormData] = useState<FormState>({
        name: "",
        email: "",
        phone: "",
        interested: initialInterested,
        privacyAccepted: false,
    });

    const [errors, setErrors] = useState<FormErrors>({
        name: false,
        email: false,
        phone: false,
        interested: false,
        privacy: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // Sync interested if it changes from outside (e.g. course loading)
    useEffect(() => {
        if (initialInterested !== 0) {
            setFormData(prev => ({ ...prev, interested: initialInterested }));
        }
    }, [initialInterested]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : (name === "interested" ? Number(value) : value),
        }));

        setErrors((prev) => ({ ...prev, [name]: false }));
        setSubmitError("");
    }, []);

    const setField = useCallback((name: keyof FormState, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name === 'privacyAccepted' ? 'privacy' : name as keyof FormErrors]: false }));
        setSubmitError("");
    }, []);

    const validateForm = useCallback(() => {
        const newErrors = {
            name: !validateName(formData.name),
            email: !validateEmail(formData.email),
            phone: !validateBGPhone(formData.phone),
            interested: requireInterested ? formData.interested === 0 : false,
            privacy: !formData.privacyAccepted,
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((val) => val === true);
    }, [formData, requireInterested]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSubmitError("");

        const isValid = validateForm();

        if (isValid) {
            setIsSubmitting(true);
            try {
                await submitConsultation({
                    name: formData.name,
                    email: formData.email,
                    phone: formatPhoneForSubmit(formData.phone),
                    interested: formData.interested,
                });
                setIsSuccess(true);
                return true;
            } catch (err) {
                setSubmitError("An error occurred. Please try again.");
                console.error("Form submit error:", err);
                return false;
            } finally {
                setIsSubmitting(false);
            }
        }
        return false;
    };

    return {
        formData,
        errors,
        isSubmitting,
        isSuccess,
        submitError,
        setSubmitError,
        handleChange,
        setField,
        handleSubmit,
        validateForm,
        setFormData,
        setErrors
    };
};
