# Manage Documents App

This repository contains a React Native application built as part of the React Native Developer Challenge. The application implements the following features:

## Features

### Required Features

- **Display the most recent documents:**  
  Documents are shown in two different views:
  - **List view:** Detailed view showing document title, version, contributors, attachments and a share button.
  - **Grid view:** A compact view showing only the title and version.
- **Real-time notifications:**  
  The app receives notifications via WebSocket when new documents are created by other users. A badge displays the number of new notifications, and tapping the bell icon opens a modal with the latest notifications.
- **Create a new document:**  
  The application includes a modal for creating a new document (UI only).

### Optional Features

- **Offline support:**  
  Documents fetched from the server are stored locally using AsyncStorage. When no internet connection is detected (using NetInfo), the app loads the stored documents.
- **Pull-to-refresh:**  
  The documents list supports pull-to-refresh to manually update the data.
- **Share functionality:**  
  Users can share document details using the native share API.
- **Relative date formatting:**  
  Dates are displayed in a relative format (e.g., "3 minutes ago") using a custom helper function (without external libraries).

## Application Structure

The project is structured to promote maintainability and scalability. Some key folders include:

```
/src
  /components
    /documents
      /DocumentCard
        - DocumentCard.tsx
        - DocumentCard.styles.ts
      /DocumentsList
        - DocumentsList.tsx
        - DocumentsList.styles.ts
      /AddDocumentModal
        - AddDocumentModal.tsx
    /notifications
      /NotificationBadge
        - NotificationBadge.tsx
      /NotificationItem
        - NotificationItem.tsx
      /NotificationsModal
        - NotificationsModal.tsx
    /layout
      /Header
        - Header.tsx
      /Footer
        - Footer.tsx
  /hooks
    - useDocuments.ts
    - useNotifications.ts
  /utils
    - getRelativeTime.ts
```

- **Components by Feature:**  
  Components are organized by feature (Documents, Notifications) and further divided into their own folders with associated styles and tests.
- **Hooks:**  
  Custom hooks (`useDocuments` and `useNotifications`) encapsulate API integration, offline storage, and WebSocket connections.
- **Utils:**  
  Utility functions like `getRelativeTime` convert dates to a relative format.

## Third-Party Libraries

- **@react-native-async-storage/async-storage:**  
  Used for storing documents locally to support offline mode.
- **@react-native-community/netinfo:**  
  Detects network connectivity to switch between online API calls and offline storage.
- **@testing-library/react-native:**  
  Used for UI and hook integration tests to ensure the correctness of the solution.
- **react-native-config:**
  This library is used to manage configuration variables in the application. It is used in the application for getting the API URL and Port from the .env file, making it easier to replace and more secure.
- **react-native-vector-icons:**
  Used for showing the different icons provided in mockups.

### Alternatives Considered

- **For relative time formatting:**  
  Instead of using a custom function, libraries like `dayjs` or `moment` were considered. However, to minimize external dependencies and showcase custom code, a simple helper function was implemented.
- **State Management:**  
  Although state management libraries like Redux were considered, the challenge requirements allowed using React's built-in state and hooks for a more straightforward implementation.

## Running the Application

1. **Clone the repository:**

   ```bash
   git clone https://github.com/marsino00/ManageDocsRep.git
   cd ManageDocsApp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the testing server:**  
   The sample Go server is included. To run the server (requires Go installed):

   ```bash
   go run server.go
   ```

4. **Run the app on iOS or Android:**

   For Android:

   ```bash
   npx react-native run-android
   ```

   For iOS:

   ```bash
   npx react-native run-ios
   ```

## Running Tests

Tests are implemented using Jest and @testing-library/react-native. To run the tests:

```bash
npm test
# or
yarn test
```

Tests cover:

- **useDocuments hook:**
  - Fetching documents when online, storing them offline.
  - Loading documents from AsyncStorage when offline.
  - Refresh functionality.
- **useNotifications hook:**
  - Accumulating notifications in batches and triggering callbacks periodically.
- **getRelativeTime function:**
  - This test file verifies that the getRelativeTime function returns the correct relative time string for different time differences.
