import { Component, OnInit } from "@angular/core";
import { messaging, Message } from "nativescript-plugin-firebase/messaging";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
})
export class AppComponent {

  ngOnInit() {
    this.pushInit()
  }

  pushInit() {
    messaging.registerForPushNotifications({
      onPushTokenReceivedCallback: (token: string): void => {
        console.log("Firebase plugin received a push token: " + token);

        dialogs.alert(`Received token: ${token}`).then(()=> {
          console.log("Dialog 1 closed!");
        });
      },

      onMessageReceivedCallback: (message: Message) => {
        console.log("Push message received: " + message.title);
      },

      // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
      showNotifications: true,

      // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
      showNotificationsWhenInForeground: true
    }).then(() => {
      console.log("Registered for push")

      this.getToken()
    });
  }

  getToken() {
    messaging.getCurrentPushToken().then(token => {
      console.log(`Current push token: ${token}`)

      dialogs.alert(`Get token: ${token}`).then(()=> {
        console.log("Dialog 2 closed!");
      });
    });
  }

}
