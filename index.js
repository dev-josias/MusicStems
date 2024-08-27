import { registerRootComponent } from "expo";

import App from "./App";
import { initializeFCM } from "@/helpers/fcm";
import notifee, { EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.ACTION_PRESS && pressAction.id === "mark-as-read") {
    await notifee.cancelNotification(notification.id);
  }
});

messaging().onNotificationOpenedApp((remoteMessage) => {
  console.log(
    "Notification caused app to open from background state:",
    remoteMessage.notification
  );
});

messaging()
  .getInitialNotification()
  .then((remoteMessage) => {
    if (remoteMessage) {
      console.log(
        "Notification caused app to open from quit state:",
        remoteMessage.notification
      );
    }
  });

initializeFCM();

registerRootComponent(App);
