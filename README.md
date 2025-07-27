# Adaptive Edge Website

A modern, interactive website for Adaptive Edge - a strategy and innovation consultancy that helps organizations thrive in uncertainty through collective intelligence, purposeful innovation, and adaptive capacity.

## Features

- **Elegant Murmuration Animation**: Beautiful flocking behavior animation in the hero section that mimics real starling murmurations with emergent collective intelligence
- **Interactive Cursor Birds**: Playful cursor interaction with small birds that follow your mouse and react to interactive elements
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Modern Tech Stack**: Built with React, TypeScript, Tailwind CSS, and Framer Motion
- **Coral & Navy Theme**: Clean, professional design with vibrant brand colors
- **Smooth Animations**: Subtle animations throughout for an engaging user experience

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **shadcn/ui** components
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** with PostgreSQL
- **Neon Database** for production
- **Zod** for validation

### Development Tools
- **TypeScript** for type safety
- **PostCSS** for CSS processing
- **ESBuild** for bundling

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/adaptive-edge-website.git
cd adaptive-edge-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Add your database URL
DATABASE_URL=your_neon_database_url_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database interface
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── migrations/            # Database migrations
```

## Key Components

### Hero Section with Murmuration
The hero section features a sophisticated murmuration animation that demonstrates:
- **Flocking Behavior**: 40 particles following three core rules (separation, alignment, cohesion)
- **Emergent Leaders**: Special particles that influence flock direction
- **Sweeping Flight Patterns**: Natural bird-like movement across the hero space
- **Brand Integration**: Coral and navy colored particles matching the brand theme

### Interactive Cursor Birds
A delightful cursor interaction featuring:
- **Formation Flying**: 6 birds that follow the cursor in dynamic formation
- **Reactive Behavior**: Birds become more animated when hovering over interactive elements
- **Individual Variation**: Each bird has unique timing and movement patterns
- **Spring Physics**: Organic, responsive movement using physics-based animations

## Sections

1. **Hero** - Compelling introduction with murmuration animation
2. **About** - Company overview with Nathan's profile
3. **Services** - Three core service offerings
4. **Tools** - Innovation Priorities and Power Canvas tools
5. **Case Studies** - Client success stories
6. **Contact** - Get in touch form

## Deployment

### Replit (Current)
The project is configured for easy deployment on Replit with automatic database provisioning.

### Other Platforms
The project can be deployed on:
- **Vercel**: Add `vercel.json` configuration
- **Netlify**: Configure build settings
- **Railway**: PostgreSQL and Express.js ready
- **DigitalOcean App Platform**: Dockerized deployment option

## Environment Variables

```env
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved by Adaptive Edge.

## Contact

- **Website**: [adaptiveedge.uk](https://adaptiveedge.uk)
- **Email**: info@adaptiveedge.uk
- **Innovation Priorities Tool**: [innovationpriorities.com](https://innovationpriorities.com)
- **Power Canvas Tool**: [power.adaptiveedge.uk](https://power.adaptiveedge.uk)

---

Built with ❤️ using modern web technologies to showcase the power of collective intelligence and adaptive innovation.