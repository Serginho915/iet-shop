"use client";

import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
    overlayClassName?: string;
}

export const Modal = ({
    isOpen,
    onClose,
    children,
    className = '',
    contentClassName = '',
    overlayClassName = ''
}: ModalProps) => {

    useEffect(() => {
        if (isOpen) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            if (scrollBarWidth > 0) {
                document.body.style.paddingRight = `${scrollBarWidth}px`;
            }
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);


    if (!isOpen) return null;

    return (
        <div className={`${styles.overlay} ${!overlayClassName ? styles.defaultOverlay : overlayClassName}`} onClick={onClose}>

            <div className={`${styles.modal} ${!className ? styles.defaultModal : className}`} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <div className={`${styles.content} ${contentClassName}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
