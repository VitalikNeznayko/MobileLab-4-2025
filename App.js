import React, { useEffect } from "react";
import { View, Text } from "react-native";
// Використовуємо правильний імпорт для Expo
import { OneSignal, LogLevel } from "react-native-onesignal";

export default function App() {
   useEffect(() => {
     // Enable verbose logging for debugging (remove in production)
     OneSignal.Debug.setLogLevel(LogLevel.Verbose);
     // Initialize with your OneSignal App ID
     OneSignal.initialize("13396ec7-9133-43d0-b3cd-67d36813054c");
     // Use this method to prompt for push notifications.
     // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
     OneSignal.Notifications.requestPermission(false);
   }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Your App</Text>
    </View>
  );
}
