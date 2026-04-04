"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface TitleContextValue {
  title: string;
  subtitle: string;
  setTitle: (title: string, subtitle?: string) => void;
}

const TitleContext = createContext<TitleContextValue>({
  title: "Dashboard",
  subtitle: "",
  setTitle: () => {},
});

export function TitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitleState] = useState("Dashboard");
  const [subtitle, setSubtitleState] = useState("");

  const setTitle = (newTitle: string, newSubtitle: string = "") => {
    setTitleState(newTitle);
    setSubtitleState(newSubtitle);
  };

  return (
    <TitleContext.Provider value={{ title, subtitle, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
}

export function useTitle(newTitle?: string, newSubtitle?: string) {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error("useTitle must be used within a TitleProvider");
  }

  useEffect(() => {
    if (newTitle !== undefined) {
      context.setTitle(newTitle, newSubtitle || "");
    }
  }, [newTitle, newSubtitle]);

  return context;
}
