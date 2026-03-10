Below is a **structured technical documentation** for the push notification system you built. You can use it for **project submission, portfolio, or team documentation**.

---

# Push Notification System – Technical Documentation

## 1. Introduction

This project is a **Web Push Notification System** similar to commercial services like push notification platforms. It allows a website to send notifications to users even when the browser is closed. The system uses modern web technologies including **Service Workers, Web Push API, and a Node.js backend**.

The system enables:

* Browser subscription to notifications
* Sending notifications to specific users
* Sending notifications to multiple users
* Tracking notification clicks
* Managing subscriptions in a database

The architecture consists of **two main components**:

* Frontend (React application)
* Backend (Node.js + Express API with MongoDB)

---

# 2. System Architecture

The system follows a **client-server architecture**.

### Frontend Responsibilities

* Request notification permission from the user
* Register a service worker
* Generate a push subscription
* Send subscription data to the backend
* Receive push notifications via the service worker
* Track notification click events

### Backend Responsibilities

* Store browser subscriptions
* Manage notification sending
* Handle multiple browser targeting
* Track notification analytics
* Provide APIs for notification management

---

# 3. Technologies Used

## Frontend Technologies

### React

React is used to build the frontend application because it allows modular UI development and easy state management.

### Service Worker

A service worker runs in the background of the browser and allows the website to receive push notifications even when the page is not open.

### Web Push API

The Web Push API allows servers to send push messages to browsers.

### PushManager

PushManager is responsible for creating the browser push subscription.

### Local Storage

Local storage is used to store the **browserId**, which uniquely identifies each browser instance.

---

## Backend Technologies

### Node.js

Node.js provides the runtime environment for the backend server.

### Express.js

Express is used to build REST APIs for subscription management and notification sending.

### MongoDB

MongoDB stores browser subscriptions and notification tracking data.

### Mongoose

Mongoose is used as an ODM (Object Data Modeling library) to interact with MongoDB.

### Web-Push Library

The web-push library is used to send push notifications using the Web Push protocol.

### UUID

UUID is used to generate unique identifiers for notifications and browser IDs.

---

# 4. Push Notification Workflow

The push notification system follows the steps below.

## Step 1 – Website Opens

When a user opens the website, the frontend automatically requests notification permission.

```
Notification.requestPermission()
```

The browser displays a popup asking the user to allow notifications.

---

## Step 2 – Service Worker Registration

Once permission is granted, the frontend registers the service worker.

```
navigator.serviceWorker.register("/sw.js")
```

The service worker runs in the background and listens for push events.

---

## Step 3 – Push Subscription Creation

The browser generates a **push subscription object**.

Example subscription:

```
{
 endpoint: "...",
 keys: {
   p256dh: "...",
   auth: "..."
 }
}
```

This subscription represents a unique browser endpoint for push notifications.

---

## Step 4 – Subscription Stored in Backend

The frontend sends the subscription to the backend API.

```
POST /api/subscribe
```

Data sent to the backend:

```
{
 browserId: "unique-browser-id",
 subscription: {...}
}
```

The backend stores this data in MongoDB.

---

## Step 5 – Sending a Notification

When a notification is triggered, the backend performs the following steps:

1. Finds the browser subscriptions in the database
2. Generates a notification payload
3. Sends the notification using the web-push library

Example payload:

```
{
 title: "New Notification",
 body: "You have a new message"
}
```

---

## Step 6 – Browser Receives Notification

The service worker receives the push event:

```
self.addEventListener("push", event => {})
```

The notification is displayed using:

```
self.registration.showNotification()
```

---

## Step 7 – Notification Click Tracking

When the user clicks the notification:

1. The service worker captures the click event
2. A request is sent to the backend
3. The backend increases the click count in the database

---

# 5. Database Design

Two main collections are used in the system.

---

## Subscription Collection

This collection stores browser subscriptions.

Example document:

```
{
 browserId: "e35d1b6a-93a1-4ad0-9fb7-a9c7970b3c74",
 subscription: {
   endpoint: "...",
   keys: {
     p256dh: "...",
     auth: "..."
   }
 },
 createdAt: Date
}
```

### Purpose

* Identify each browser
* Store push subscription details
* Enable targeted notifications

---

## Notification Collection

This collection stores notification tracking information.

Example document:

```
{
 notificationId: "abc123",
 title: "New Offer",
 message: "50% Discount",
 browserIds: ["browser1","browser2"],
 clicks: 5,
 createdAt: Date
}
```

### Purpose

* Track sent notifications
* Store target users
* Track click analytics

---

# 6. System Features

The implemented system includes the following features.

## Browser Subscription

Users can subscribe to push notifications when they allow browser permission.

## Targeted Notifications

Notifications can be sent to specific browser IDs.

## Multiple Browser Notifications

A single notification can be sent to multiple browsers.

## Background Notifications

Notifications appear even when the website is closed.

## Notification Click Tracking

The system records when users click on notifications.

## URL Redirection

Users can be redirected to a specific URL after clicking a notification.

---

# 7. Security Implementation

Several security practices are implemented.

### VAPID Authentication

VAPID keys authenticate the server sending push notifications.

### Unique Browser IDs

Each browser receives a unique identifier to prevent conflicts.

### Controlled Notification API

Notifications can only be triggered through backend APIs.

---

# 8. API Endpoints

### Subscribe Browser

```
POST /api/subscribe
```

Purpose:
Store browser subscription.

---

### Send Notification

```
POST /api/send
```

Purpose:
Send notification to one or more browsers.

Example request:

```
{
 browserIds:["id1","id2"],
 title:"New Message",
 message:"Hello User"
}
```

---

### Click Tracking

```
POST /api/click-track
```

Purpose:
Track notification clicks.

---

# 9. Testing Procedure

## Step 1 – Run Backend

Start the backend server.

```
npm start
```

---

## Step 2 – Run Frontend

Start the React application.

```
npm run dev
```

---

## Step 3 – Open Website

Open:

```
http://localhost:5173
```

Allow notifications when prompted.

---

## Step 4 – Verify Subscription

Check MongoDB to confirm a subscription document has been created.

---

## Step 5 – Send Test Notification

Using Postman:

```
POST http://localhost:5000/api/send
```

Body example:

```
{
 browserIds:["browserId"],
 title:"Test Notification",
 message:"Push system working"
}
```

---

## Step 6 – Verify Notification

A push notification should appear in the browser.

---

## Step 7 – Test Click Tracking

Click the notification and check the **click count** in the database.

---

# 10. Limitations

Current system limitations include:

* No notification scheduling
* No admin dashboard
* No segmentation filters
* Limited analytics

---

# 11. Future Improvements

Possible improvements include:

* Notification scheduling
* Admin dashboard
* Audience segmentation
* Delivery statistics
* Retry queue system
* Broadcast notifications
* Multi-website support

---

# 12. Conclusion

This push notification system demonstrates how modern web technologies can be used to deliver real-time notifications to users. By combining **React, Service Workers, Web Push API, and a Node.js backend**, the system enables reliable background notifications, targeted messaging, and user interaction tracking.

The architecture is scalable and can be extended to support advanced features similar to professional push notification platforms.

---

If you want, I can also make a **more professional version of this documentation (15–20 pages format like a software project report with diagrams, architecture charts, and flow diagrams)** which is better for **portfolio or university submission**.
