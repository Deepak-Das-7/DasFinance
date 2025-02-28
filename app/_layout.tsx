import { Slot, router } from "expo-router";
import React from "react";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    const checkAuth = async () => {
      const token = "das";
      if (token === "das") {
        router.replace("/Notes");
      } else {
        router.replace("/Dashboard");
      }
    };

    checkAuth();
  }, []);

  return <Slot screenOptions={{ headerShown: false }} />;
}
