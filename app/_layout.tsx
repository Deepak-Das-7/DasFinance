import { Stack, router } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    const checkAuth = async () => {
      const token = "das";
      if (token === "das") {
        router.replace("/onboard/Notes");
      } else {
        router.replace("/Dashboard");
      }
    };

    checkAuth();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
