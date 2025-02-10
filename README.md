# Stock View Application

A React-based web application for viewing and analysing stock price data. The application provides an interactive interface to view stock prices with filtering, sorting, and visualisation capabilities.

## Features

- Interactive stock price chart using Chart.js
- Data table with sortable columns
- Search timestamp functionality 
- Filter capabilities for all data points
- Responsive design for mobile and desktop
- Real-time data updates
- Performance-optimised rendering
- Accessible colour scheme

## Getting Started

### Prerequisites

- Node.js (v21 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/luke-mcilwaine/stock-view.git
cd stock-view-app
```

2. Install Dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at http://localhost:5173/

## Running Tests
```bash
npm test
```

# Development Approach
## Key Decisions
1. Technology Stack
- Used vite framework to improve development speed and ensure modern feature compatability
- React with TypeScript for type safety and better developer experience
- Chart.js for lightweight and performant data visualisation
- Using the simpler Context API for state management instead of Redux

2. Architecture
- Component-based architecture for reusability
- Custom hooks for data fetching and state management
- Separation of concerns between data, presentation, and business logic

3. Data Management
- Client-side filtering and sorting for better user experience
- Debounced search to prevent excessive re-renders
- Memoised components to optimise performance

4. Layout
- Segmented approach for ease navigation
- Search Bar at top for immediate filtering
- Spin Boxes for enhanced user experience
- Wide chart for increased visibility

## Trade-offs and Challenges

1. Data Loading
- Challenge: Large dataset causing performance issues
- Solution: Implemented pagination and lazy loading
- Trade-off: Some data not immediately available vs better performance

2. Real-time Updates
- Challenge: Frequent updates causing excessive re-renders
- Solution: Implemented debouncing
- Trade-off: Slight delay in updates vs better performance

3. Mobile Responsiveness
- Challenge: Complex data visualisation on small screens
- Solution: Simplified view with essential information
- Trade-off: Less visible functionality vs better usability

4. Unit Testing Components
- Challenge: Render tests create test incompatability
- Solution: Enabled experimental JSX within Jest 
- Trade-off: Wider testing coverage vs possible instability

## Performance Optimisation

1. State Management
- Efficient use of React Context
- Memoisation of expensive calculations
- Optimised re-render cycles

3. Data Handling
- Optimised data structures
- Efficient filtering algorithms

4. Asset Optimisation
- Minified CSS and JavaScript
- Proper caching headers

# Future Improvements
1. Features
- Additional chart data
- Export functionality
- Custom date ranges

2. Technical
- Adding configuration variables to the api url
- Server-side filtering
- Transform to a Progressive Web App
- Improved test coverage

3. Performance
- Worker threads
- Better caching techniques
