import { Stack, router } from "expo-router";
import React from "react";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    const checkAuth = async () => {
      const token = "das";
      if (token === "das") {
        router.replace("/onboard/Notes");
      } else {
        router.replace("/(main)/Dashboard");
      }
    };

    checkAuth();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
