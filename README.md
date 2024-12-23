# News Aggregator App

This repository contains the NewssAggregator app built using **React Native** for the frontend. It is shipped via express. The app allows users to view a feed of news articles and view detailed news articles on a separate page using an embedded web browser. Addtionally the app collects user interaction data like clicks, views and view-duration.

## Features

- **News Feed**: Displays a list of aggregated news articles.
- **News Article Detail Page**: Displays the content of a selected news article using an embedded web browser.
- **React Native WebView**: The article detail is shown in a web view embedded in the app.

## Requirements

- **Node.js** (for Express server)
- **React Native** (for mobile app)
- **Expo CLI** (optional but recommended for easier React Native development)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/news-aggregator-app.git
cd news-aggregator-app
```
### 2. Backend (Express)
Navigate to the backend folder (or wherever your Express server code is).

Install the necessary dependencies:

```bash
cd backend
npm install
```
Start the server:

```bash
npm start
```

The Express server should now be running and serving the aggregated news data.

3. Frontend (React Native)
Install the dependencies for the React Native app:
bash

cd frontend
npm install
Start the React Native app (if using Expo):
bash

expo start

