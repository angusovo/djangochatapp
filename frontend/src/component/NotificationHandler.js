import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

export const NotificationHandler = (type, title, message) => {
  switch (type) {
    case "info":
      NotificationManager.info(title, message);
      break;
    case "success":
      NotificationManager.success(title, message);
      break;
    case "warning":
      NotificationManager.warning(title, message);
      break;
    case "error":
      NotificationManager.error(title, message);
      break;
  }
};
