# Adaptive Edge Website

A modern, full-stack web application for Adaptive Edge, a strategy and innovation consultancy. Built with React, TypeScript, and PostgreSQL, featuring beautiful animations and a responsive design.

## 🚀 Live Demo

**Website:** [adaptiveedge.uk](https://adaptiveedge.uk)

## ✨ Features

- **Murmuration Animation**: Beautiful flocking behavior in the hero section using emergent particle systems
- **Interactive Cursor Birds**: Playful cursor followers that react to mouse movement and hover states
- **Contact Form**: Full database integration with PostgreSQL for permanent storage
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Modern Stack**: React 18, TypeScript, Tailwind CSS, Express.js, Drizzle ORM
- **Production Ready**: Optimized builds, SSL support, and deployment documentation

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** with shadcn/ui components
- **Framer Motion** for smooth animations
- **TanStack Query** for server state management
- **Wouter** for client-side routing

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** database with Drizzle ORM
- **Zod** for runtime validation
- **RESTful API** endpoints

### Development
- **Vite** for fast development and building
- **ESBuild** for server compilation
- **TypeScript** across the entire stack

## 🎨 Design Features

- **Brand Colors**: Coral and navy theme with gradient backgrounds
- **Animations**: Particle systems, micro-interactions, and smooth transitions
- **Typography**: Clean, modern fonts with proper hierarchy
- **Layout**: Asymmetric image styling and balanced compositions

## 📱 Pages & Components

- **Hero Section**: Murmuration animation with compelling messaging
- **About Section**: Company overview with animated elements
- **Services**: Strategy, innovation, and consulting offerings
- **Case Studies**: Client success stories and testimonials
- **Contact Form**: Direct client communication with database storage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Environment variables configured

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/adaptive-edge-website.git
   cd adaptive-edge-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Add your DATABASE_URL and other variables
   ```

4. **Initialize database:**
   ```bash
   npm run db:push
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

Visit `http://localhost:5000` to see the application.

## 🏗 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Express.js backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── db.ts              # Database connection
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Drizzle database schema
└── dist/                  # Production build output
```

## 🗄 Database Schema

The application uses PostgreSQL with the following tables:

- **contacts**: Stores contact form submissions
- **users**: User management (for future features)

## 📡 API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Retrieve contact submissions (admin)

## 🚀 Deployment

### DigitalOcean Deployment

Complete deployment guide available in [DIGITALOCEAN_DEPLOYMENT.md](./DIGITALOCEAN_DEPLOYMENT.md)

**Quick deployment:**
1. SSH into your DigitalOcean droplet
2. Follow commands in [FINAL_DEPLOYMENT_COMMANDS.md](./FINAL_DEPLOYMENT_COMMANDS.md)
3. Your site will be live with HTTPS and database integration

### Environment Variables

Required environment variables for production:

```env
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=5000
```

## 🧪 Testing

Test the contact form:
```bash
curl -X POST https://adaptiveedge.uk/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","company":"Test Co","message":"Testing"}'
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push database schema changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by Adaptive Edge.

## 🔗 Links

- **Website**: [adaptiveedge.uk](https://adaptiveedge.uk)
- **Innovation Priorities Tool**: [innovationpriorities.com](https://innovationpriorities.com)
- **Power Canvas Tool**: [power.adaptiveedge.uk](https://power.adaptiveedge.uk)

## 📞 Contact

For questions about this codebase or Adaptive Edge services:
- **Website**: [adaptiveedge.uk](https://adaptiveedge.uk)
- **Contact Form**: Available on the website

---

Built with ❤️ for Adaptive Edge - Thriving in uncertainty through collective intelligence.