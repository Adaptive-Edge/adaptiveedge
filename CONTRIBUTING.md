# Contributing to Adaptive Edge Website

Thank you for your interest in contributing to the Adaptive Edge website! This document provides guidelines and information for contributors.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/adaptive-edge-website.git
   cd adaptive-edge-website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Code Style Guidelines

### TypeScript/React
- Use TypeScript for all new code
- Follow existing component patterns
- Use functional components with hooks
- Prefer named exports over default exports for components

### Styling
- Use Tailwind CSS for styling
- Follow the existing color scheme (coral and navy)
- Ensure responsive design for all components
- Use shadcn/ui components where possible

### Animation Guidelines
- Keep animations subtle and purposeful
- Use Framer Motion for complex animations
- Ensure animations don't interfere with accessibility
- Test animations on different devices and browsers

## Component Architecture

### File Structure
```
src/components/
├── ui/              # shadcn/ui components
├── sections/        # Page sections (hero, about, etc.)
└── interactive/     # Animation components (murmuration, cursor-birds)
```

### Animation Components
- **Murmuration**: Hero section flocking animation
- **Cursor Birds**: Interactive cursor followers
- Keep animations performant and optional on mobile

## Database Schema

When modifying the database schema:
1. Update `shared/schema.ts` first
2. Create migration files in `migrations/`
3. Update storage interface in `server/storage.ts`
4. Test with both in-memory and PostgreSQL storage

## Testing Checklist

Before submitting a PR:
- [ ] Test on desktop and mobile
- [ ] Verify animations work smoothly
- [ ] Check form submissions
- [ ] Ensure proper TypeScript types
- [ ] Test with both development and production builds

## Commit Guidelines

- Use clear, descriptive commit messages
- Start with a verb in present tense
- Keep first line under 50 characters
- Reference issues when applicable

Examples:
- `Add cursor bird interaction feature`
- `Fix murmuration animation performance`
- `Update contact form validation`

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following the guidelines above
3. Test thoroughly
4. Submit PR with clear description
5. Address any review feedback

## Questions or Issues?

Feel free to open an issue or reach out if you have questions about contributing!