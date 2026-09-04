"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext<{ isLoaded: boolean }>({ isLoaded: false });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial site load sequence duration
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
