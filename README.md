# API-UI Dashboard

A modern, real-time dashboard for monitoring API usage, rate limiting, and anomaly detection. Built with Next.js and Tailwind CSS.

## Features

### Real-time Monitoring
- *Rate Limiting Dashboard*: Monitor API usage patterns and rate limits in real-time
- *IP-based Tracking*: Track and analyze requests by client IP addresses
- *API Key Management*: Monitor usage patterns for different API keys
- *Reputation System*: Track client reputation scores for better security

### Security Features
- *Anomaly Detection*: Built-in machine learning model for detecting suspicious patterns
- *Blocked Requests Tracking*: Monitor and analyze blocked requests
- *Client Reputation*: Track and manage client reputation scores
- *Real-time Alerts*: Get notified of suspicious activities

### Model Statistics
- *Training Metrics*: View model training statistics and performance metrics
- *Detection Algorithm*: Monitor the anomaly detection algorithm's performance
- *Blocked Clients*: Track clients blocked by the anomaly detection system

## Technical Stack

- *Frontend*: Next.js 15.3.2
- *UI Framework*: Tailwind CSS
- *Icons*: Lucide React
- *Fonts*: Geist (Sans and Mono)
- *Development*: Turbopack for faster development

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
``` bash
git clone <repository-url>
cd api-ui
```

2. Install dependencies:
``` bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
``` bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Setup

The dashboard connects to the following endpoints:
- http://localhost:8082/admin/metrics - Main metrics data
- http://localhost:8082/admin/detection-stats - Anomaly detection statistics

## Dashboard Components

### Stats Overview
- Total IPs tracked
- Active API Keys
- Reputation scores tracked
- Blocked requests count
- Model blocked clients

### Metrics Sections
1. *Rate by IP Address*
   - Request rates grouped by client IP addresses
   - Real-time monitoring of IP-based usage

2. *Rate by API Key*
   - Request rates grouped by API authentication keys
   - Usage patterns for different API keys

3. *Reputation Scores*
   - Trust scores for various clients
   - Historical reputation tracking

4. *Blocked Requests*
   - Requests denied due to rate limiting
   - Blocking patterns and statistics

5. *Model Detection*
   - Anomaly detection results
   - Blocked clients by the model
   - Detection algorithm details

6. *Model Training Statistics*
   - Training metrics and performance data
   - Model version and updates

## Development

### Available Scripts

- npm run dev - Start development server with Turbopack
- npm run build - Build for production
- npm run start - Start production server
- npm run lint - Run ESLint

### Project Structure

<pre>
.
├── README.md
|---.next                   # Next.js build output
├── app                     # Next.js app directory
│   ├── favicon.ico
│   ├── globals.css         # Global styles
│   ├── layout.js
│   └── page.js             # Main dashboard page
│   ├── layout.js         
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json            # Project dependencies
├── postcss.config.mjs
└── public                  # Static assets
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
</pre>

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide React](https://lucide.dev)