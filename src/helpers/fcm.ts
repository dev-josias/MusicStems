import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from "@notifee/react-native";
import { Alert, Linking } from "react-native";

const createNotificationChannel = async () => {
  try {
    await notifee.createChannel({
      id: "MusicStems",
      name: "Music Stems Channel",
      importance: AndroidImportance.HIGH,
    });

    console.log("Notification channel created");
  } catch (error) {
    console.error("Error creating notification channel", error);
  }
};

export const showNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) => {
  try {
    console.log("remote message", remoteMessage);

    // Extract the progress and notification_id from the data
    const progress =
      (remoteMessage.data.progress as unknown as string) || undefined;
    const notificationId =
      (remoteMessage.data.notification_id as unknown as string) || "default_id";

    const { title, body } = remoteMessage.notification || {};
    if (!title || !body) {
      console.warn("Notification is missing title or body");
      return;
    }

    // Display the notification with progress
    await notifee.displayNotification({
      id: notificationId,
      title,
      body,
      android: {
        channelId: "MusicStems",
        importance: AndroidImportance.HIGH,
        progress:
          progress && progress !== "100"
            ? {
                max: 100,
                current: parseInt(progress, 10),
              }
            : undefined,
      },
    });
    console.log("Notification displayed with progress:", progress);
  } catch (error) {
    console.error("Error displaying notification", error);
  }
};

async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    } else {
      console.warn("User denied notification permissions");
    }
  } catch (error) {
    console.error("Error requesting notification permissions", error);
  }
}

export const initializeFCM = async () => {
  try {
    const settings = await notifee.requestPermission();
    const enabled =
      settings.authorizationStatus ===
        messaging.AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus ===
        messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await requestUserPermission();
      await createNotificationChannel();

      messaging().onMessage(showNotification);

      // @ts-ignore
      messaging().setBackgroundMessageHandler(showNotification);

      console.log("FCM initialized");
    } else {
      Alert.alert(
        "Permissions denied",
        "This app needs notifications permissions to work correctly",
        [
          {
            text: "Open settings",
            onPress: () => Linking.openSettings(),
          },
          {
            text: "Cancel",
          },
        ]
      );
    }
  } catch (error) {
    console.error("Error initializing FCM", error);
  }
};
