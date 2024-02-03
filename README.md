# Weather app - React Native

This React Native app is designed to work as the frontend for a weather notification service, showcasing the Observer pattern in a full-stack context. It interacts with a backend service to receive real-time weather updates and display notifications to the user. This project is part of a larger demonstration on implementing the Observer pattern, with the backend service written in Python and available [here](https://github.com/nemanjatan/weather-app-be).

## Getting Started

### Prerequisites

- Node.js and npm/yarn installed
- React Native development environment set up, including Xcode for iOS development
- Backend service running (follow setup instructions [here](https://github.com/nemanjatan/weather-app-be/blob/main/README.md))

### Installation

1. Clone the repository

```
git clone https://github.com/nemanjatan/weather-app-fe.git
cd weather-app-fe
```

2. Install dependencies:

`npm install`

or if you use yarn:

`yarn install`

3. Update the backend service URL in App.tsx to point to your running instance of the backend project.

### Running the App

To start the app on iOS: `npx react-native run-ios`
Or for Android: `npx react-native run-android`

Make sure your backend service is running and accessible from your development environment for the app to function correctly.

## Features

- Real-time connection to backend via WebSocket using Socket.IO
- Subscribing and unsubscribing to weather updates
- Displaying push notifications for weather updates on iOS devices

## iOS Specific Setup

This project includes specific setup for iOS push notifications:

- Handling permissions for push notifications
- Configuring AppDelegate to manage notification events

Ensure you've followed the React Native setup instructions for push notifications on iOS, including configuring your Apple Developer account and provisioning profiles as necessary.

## Contributing

Contributions are welcome! If you have improvements or bug fixes, please feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
