"use client";

import React, { createContext, useContext, useState } from "react";
import { Post } from "./api"; // assuming Post is exported from api.ts

interface BlogContextType {
    selectedBlog: Post | null;
    setSelectedBlog: (post: Post | null) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
    const [selectedBlog, setSelectedBlog] = useState<Post | null>(null);

    return (
        <BlogContext.Provider value={{ selectedBlog, setSelectedBlog }}>
            {children}
        </BlogContext.Provider>
    );
}

export function useBlog() {
    const context = useContext(BlogContext);
    if (context === undefined) {
        throw new Error("useBlog must be used within a BlogProvider");
    }
    return context;
}
