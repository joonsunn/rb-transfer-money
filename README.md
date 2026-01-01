# RB Transfer Money App

## Overview

This is a mobile application built with React Native and Expo for sending money to bank accounts. The app provides a user-friendly interface for initiating and confirming bank transfers.

## Setup Instructions

### Prerequisites

- Node.js (v24 or later)
- npm
- Expo CLI
- Android Studio or Xcode (for running on emulators or devices)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/rb-transfer-money.git
   cd rb-transfer-money
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Expo development server:

   ```bash
   npm run start
   ```

4. Run the app on an emulator or physical device:
   - For Android: Press `a` in the terminal to launch the Android emulator. If an error message appears that says "development build not installed", kill the development server and run `npm run android` instead.
   - For iOS: Press `i` in the terminal to launch the iOS simulator. If an error message appears that says "development build not installed", kill the development server and run `npm run ios` instead.
   - Web browser: Press `w` in the terminal to launch the app in the web browser (the app will be live on `http://localhost:8081`).

### Assumptions

- You have an Android or iOS emulator set up, or a physical device connected for testing. Otherwise, you may test the application on a desktop web browser.
- The Android or iOS emulator (or device) has biometric authentication (FaceID (iOS) or fingerprint (Android)) already set up. Otherwise, the transaction approval screen will fallback to password authentication.
- Ensure you have a stable internet connection for fetching dependencies and running the app.

## Design Decisions

- **Expo**: Provides a managed workflow for building React Native apps, and simplifying development across iOS and Android platforms.
- **UI/UX**: Inspired by the app of the first AI-powered digital bank in Malaysia, focusing on a modern and intuitive user experience.
- **TanStack Query**: Chosen for efficient data fetching and state management, providing a robust solution for handling API calls and caching. It is also used as an abstraction layer on top of grabbing data from the `AccountInfoContext` to simulate API requests (mainly to add delay, and query invalidations).
- **Mock functions**: Several functions are mocked, such as password authentication, account info, and recipient info retrieval. This is done to limit the scope of the app
- **React Hook Form**: Used for managing form state and validation, ensuring a seamless and performant user input experience.
- **Zod**: Integrated for schema validation, ensuring data integrity and consistency across the application.
- **expo-local-authentication**: Implemented for secure user authentication, leveraging device-specific biometric authentication methods.

## Challenges Faced

### Learning Curve

The primary challenge was the lack of familiarity with the React Native and Expo ecosystem, as this was my first React Native project created from scratch. Transitioning from web development to mobile development required understanding new concepts, tools, and workflows. For instance, adapting to Expo's file-based routing mechanism was initially confusing, as it relies on specific file-naming conventions to define routes. This required careful attention to detail to ensure the app's navigation worked as intended.

### Cross-Platform Development

Ensuring UI consistency and functionality across both Android and iOS platforms presented significant challenges. Testing the app on different device operating systems revealed platform-specific quirks that needed to be addressed. For example:

- **Font Naming**: Discovering that the `serif` font is named `ui-serif` on iOS was a minor but time-consuming issue.
- **UI Components**: Some UI components behaved differently on Android and iOS, requiring conditional rendering or platform-specific styling to ensure a consistent user experience.
- **Device-Specific Features**: Leveraging device-specific features, such as biometric authentication, required thorough testing and debugging to ensure compatibility across platforms.

### JavaScript Engine Differences

Another notable challenge was recognizing that the JavaScript engine in React Native differs from the one in web browsers. For example, the absence of the `crypto` API in React Native necessitated the use of alternative libraries or workarounds to achieve similar functionality. This required additional research and experimentation to find suitable solutions that worked within the constraints of the React Native environment.

Overall, these challenges provided valuable learning experiences and insights into the nuances of mobile app development with React Native and Expo. Each obstacle overcome contributed to a deeper understanding of the framework and its capabilities.

### Demo Video

#### Android

[![Android demo video](https://github.com/user-attachments/assets/249dfcbd-7757-41d7-84cd-608ea444c867)](https://github.com/user-attachments/assets/249dfcbd-7757-41d7-84cd-608ea444c867)

#### iOS

[![iOS demo video](https://github.com/user-attachments/assets/c5cb0cd2-b22a-4e56-b398-6be9ae87bee6)](https://github.com/user-attachments/assets/c5cb0cd2-b22a-4e56-b398-6be9ae87bee6)
