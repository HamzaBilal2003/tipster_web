# Punter Admin

## Overview
Punter Admin is a React-based admin dashboard for managing various aspects of the Punter application. This project includes features such as user support, notifications, social data management, and more.

## Features
- **User Support**: Manage user chats and support tickets.
- **Notifications**: Send and manage notifications to users.
- **Social Data**: View and manage social media posts.
- **Charts and Graphs**: Visualize data using charts.

## Project Structure
The project is organized as follows:
```
/src
  /assets
    - images
  /components
    - SearchFilter.tsx
    - ChartGraph.tsx
  /pages
    /support
      - Support.tsx
      /components
        - SupportHeader.tsx
        - UserChat.tsx
        - ChatCan.tsx
    /notification
      - SendNotification.tsx
      /components
        - NotificationForm.tsx
        - AudienceModal.tsx
    /social
      /components
        - SocialData.tsx
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/punter_admin.git
   ```
2. Navigate to the project directory:
   ```sh
   cd punter_admin
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Start the development server:
   ```sh
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Components
### SearchFilter
A reusable search filter component that can be used to filter data based on user input.

### ChartGraph
A component to display data using bar charts.

### SendNotification
A component to send notifications to users, including the ability to upload images.