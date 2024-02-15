# Project Codebase Readme

## Overview
This project is a React application that utilizes Zustand for state management and Chakra UI for the user interface. It interacts with a Supabase backend for user profile and watchlist data, and also fetches cryptocurrency details from an external API.

## File Structure
- `src/components/crypty/Stores/watchListStore.js`: Manages the user's watchlist and interacts with the Supabase backend to update and fetch watchlist data.
- `src/components/crypty/Stores/tokenDetailsStore.js`: Handles fetching and updating token details, including price, market cap, and other metrics, from an external API.
- `src/components/crypty/Stores/activeTokenStore.js`: Manages the active token state and provides a function to update it.
- `src/components/Header.jsx`: Contains the application header with user profile information and a menu button for toggling options.
- `src/components/crypty/LineGlobalStats.jsx`: Displays global cryptocurrency statistics, including market cap, trading volume, and gas prices.
- `src/components/crypty/CryptyHome.jsx`: Manages the home page, including fetching token details and global data, and displaying various components based on screen size.
- `src/components/crypty/ListDetails.jsx`: Displays specific token details, such as market cap and trading volume, with optional loading skeleton.
- `src/components/crypty/TokenDescription.jsx`: Displays the description of a token with optional loading skeleton.
- `src/components/crypty/Micros/Watchlist.jsx`: Manages the user's watchlist and provides a dropdown menu to view and interact with the watchlist.
- `src/components/crypty/TokenDetailsCard.jsx`: Displays detailed statistics for a specific token, including price, market cap, and supply details.
- `src/components/crypty/Categories.jsx`: Manages the categories section, fetching and displaying trending and updated coins, and trending pools.

## Usage
To run the application, ensure you have the necessary dependencies installed and then start the development server using the appropriate command for your environment.

## Dependencies
- React
- Zustand
- Chakra UI
- Supabase
- External cryptocurrency API

## Development
To contribute to the project, follow the existing file structure and coding patterns. Ensure to handle form fields appropriately to avoid read-only fields and provide mutable options where necessary.
