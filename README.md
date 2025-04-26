# Project Codebase Readme

## Overview
This project is a React application designed to provide users with a seamless experience in managing their cryptocurrency investments. It utilizes Zustand for state management and Chakra UI for a responsive and accessible user interface. The application interacts with a Supabase backend for user profile and watchlist data, and fetches cryptocurrency details from an external API.

## Features
- **User Authentication**: Secure login and registration using Supabase.
- **Watchlist Management**: Users can add, remove, and view their favorite cryptocurrencies.
- **Real-time Data**: Fetches and displays real-time cryptocurrency data, including prices, market cap, and trading volume.
- **Responsive Design**: Adapts to various screen sizes using Chakra UI components.
- **Interactive Tours**: Guides new users through the application features with interactive tours.

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
To run the application, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Dependencies
- **React**: A JavaScript library for building user interfaces.
- **Zustand**: A small, fast state-management solution.
- **Chakra UI**: A simple, modular, and accessible component library for React.
- **Supabase**: An open-source Firebase alternative that provides a backend as a service.
- **External Cryptocurrency API**: Fetches real-time cryptocurrency data.

## Development
To contribute to the project, follow these guidelines:

- Maintain the existing file structure and coding patterns.
- Ensure to handle form fields appropriately to avoid read-only fields and provide mutable options where necessary.
- Write clear and concise commit messages.
- Create pull requests for any new features or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to the contributors and the open-source community for their support and resources.
- Special thanks to the creators of the libraries and tools used in this project.
