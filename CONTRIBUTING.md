# Contributing to Adaptive Edge Website

Thank you for your interest in contributing to the Adaptive Edge website! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database access
- Git knowledge
- TypeScript/React experience

### Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/adaptive-edge-website.git
   cd adaptive-edge-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   # Configure your DATABASE_URL and other variables
   ```

4. **Initialize database:**
   ```bash
   npm run db:push
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

## 🏗 Project Architecture

### Frontend (`client/`)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **TanStack Query** for server state
- **Wouter** for routing

### Backend (`server/`)
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **Zod** for validation
- **RESTful API** design

### Shared (`shared/`)
- Database schemas
- TypeScript types
- Validation schemas

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Use Tailwind CSS classes instead of custom CSS
- Implement proper error handling
- Add TypeScript types for all functions

### Component Guidelines
- Use functional components with hooks
- Implement proper loading and error states
- Use shadcn/ui components when possible
- Follow the existing component structure
- Add PropTypes or TypeScript interfaces

### Animation Guidelines
- Use Framer Motion for complex animations
- Keep animations smooth and performant
- Test animations on different devices
- Follow the existing animation patterns
- Consider reduced motion preferences

### Database Guidelines
- Use Drizzle ORM for all database operations
- Define schemas in `shared/schema.ts`
- Use proper TypeScript types
- Implement proper error handling
- Follow existing storage patterns

## 🔄 Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages
Follow conventional commit format:
- `feat: add new animation component`
- `fix: resolve contact form validation`
- `docs: update deployment guide`
- `style: improve mobile responsiveness`

### Pull Request Process

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Test your changes:**
   ```bash
   npm run build
   npm run dev
   ```

4. **Submit a pull request:**
   - Provide a clear description
   - Reference any related issues
   - Include screenshots for UI changes

## 🧪 Testing

### Manual Testing
- Test all interactive elements
- Verify responsive design
- Check animations on different devices
- Test contact form functionality
- Validate database operations

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📋 Code Review Checklist

### General
- [ ] Code follows TypeScript best practices
- [ ] No console.log statements in production code
- [ ] Proper error handling implemented
- [ ] Code is well-documented

### Frontend
- [ ] Components are properly typed
- [ ] Responsive design works on all devices
- [ ] Animations are smooth and performant
- [ ] Accessibility considerations met
- [ ] Loading states implemented

### Backend
- [ ] API endpoints properly validated
- [ ] Database operations use proper types
- [ ] Error responses are consistent
- [ ] Security considerations addressed

## 🐛 Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information
- Screenshots if applicable

### Issue Labels
- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation needs improvement
- `animation` - Animation-related issues
- `database` - Database-related issues

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Database
npm run db:push     # Push schema changes
npm run db:studio   # Open database studio (if available)

# Linting and formatting
npm run lint        # Check code style
npm run format      # Format code
```

## 📚 Resources

### Documentation
- [React Documentation](https://reactjs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Drizzle ORM](https://orm.drizzle.team/)

### Design Resources
- Brand colors: Coral (#FF6B6B) and Navy (#2C3E50)
- Typography: System fonts with proper hierarchy
- Animation principles: Smooth, purposeful, accessible

## 📞 Getting Help

If you need help:
1. Check existing documentation
2. Look at similar implementations in the codebase
3. Create an issue for discussion
4. Reach out to maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Adaptive Edge! 🚀