"use client";

import React, { createContext, useContext, useState } from "react";
import { Course } from "./api";

interface CourseContextType {
    selectedCourse: Course | null;
    setSelectedCourse: (course: Course | null) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    return (
        <CourseContext.Provider value={{ selectedCourse, setSelectedCourse }}>
            {children}
        </CourseContext.Provider>
    );
}

export function useCourse() {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error("useCourse must be used within a CourseProvider");
    }
    return context;
}
