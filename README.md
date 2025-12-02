# 🔐 Auth Client - Frontend

> A modern, production-ready authentication frontend built with React, TypeScript, Vite, and TanStack Query. Featuring comprehensive form validation, responsive design, and best-in-class developer experience.

[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 🎯 Overview

This frontend provides a complete authentication user interface with modern UX patterns, form validation, and seamless integration with the Auth Server backend. Built following React best practices and industry standards for scalability and maintainability.

### What's Inside

```
Authentication    →  Sign up, sign in, protected routes, JWT management
Form Validation   →  Zod schemas, real-time validation, password strength
State Management  →  TanStack Query, Zustand, persistent storage
UI Components     →  Reusable, accessible, responsive Tailwind components
Type Safety       →  Full TypeScript coverage with strict mode
Code Quality      →  ESLint, Prettier, Husky hooks, Commitlint
Error Handling    →  Error boundaries, global handlers, user-friendly messages
Developer Tools   →  React Query DevTools, hot reload, path aliases
```

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js  ≥ 18.x
npm      ≥ 9.x
```

### Installation

**Step 1: Clone and Install**

```bash
git clone <your-repo>
cd auth-client
npm install
```

**Step 2: Configure Environment**

```bash
cp .env.example .env
# Edit .env with your backend API URL
```

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=Auth Client
```

**Step 3: Start Development Server**

```bash
npm run dev

# ✅ App ready at http://localhost:5173
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/v1

# App Configuration
VITE_APP_NAME=Auth Client
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=development
```

> **⚠️ Note**: All environment variables must be prefixed with `VITE_` to be exposed to the client.

### Backend Integration

This frontend is designed to work with the Auth Server backend. Ensure the backend is running before starting development:

1. Start the backend server (default: `http://localhost:3000`)
2. Update `VITE_API_BASE_URL` in `.env` if using a different port
3. Backend API documentation: `http://localhost:3000/api/v1/docs`

---

## 📱 Features

### Authentication Pages

| Page      | Route        | Description                       |
| --------- | ------------ | --------------------------------- |
| Sign Up   | `/signup`    | User registration with validation |
| Sign In   | `/signin`    | User login with credentials       |
| Dashboard | `/dashboard` | Protected user dashboard          |
| 404       | `*`          | Not found page                    |

### Sign Up Features

- ✅ Full name validation (min 3 characters)
- ✅ Email format validation
- ✅ Password strength indicator with visual feedback
- ✅ Real-time validation with error messages
- ✅ Password requirements:
  - Minimum 8 characters
  - At least one letter
  - At least one number
  - At least one special character (`!@#$%^&*`)
- ✅ Show/hide password toggle
- ✅ Loading states during submission
- ✅ Error handling with user-friendly messages

### Sign In Features

- ✅ Email and password login
- ✅ Form validation
- ✅ Show/hide password toggle
- ✅ Automatic redirect after successful login
- ✅ Error handling

### Dashboard Features

- ✅ Welcome message with user name
- ✅ User profile information display
- ✅ Account creation date
- ✅ Logout functionality
- ✅ Loading states
- ✅ Error handling
- ✅ Beautiful, responsive design

---

## ⚙️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors automatically
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm test                 # Run tests
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report

# Git Hooks
npm run prepare          # Install Husky hooks
```

### Code Quality Tools

**ESLint** - Linting with TypeScript rules

- React hooks rules
- React refresh rules
- Prettier integration

**Prettier** - Code formatting

- Consistent code style
- Automatic formatting on save
- Pre-commit formatting

**Husky** - Git hooks

- Pre-commit: Lint and format staged files
- Commit-msg: Validate commit messages

**Commitlint** - Conventional commits

- Enforces commit message format
- Improves changelog generation

---

## 🎨 UI/UX Design

### Design Principles

- **Mobile-First**: Responsive design that works on all devices
- **Accessible**: WCAG 2.1 AA compliance with ARIA labels
- **Consistent**: Unified design system with Tailwind CSS
- **Performant**: Fast load times, smooth interactions
- **User-Friendly**: Clear error messages, helpful feedback

### Color Palette

```css
Primary:   Blue (#0ea5e9)
Success:   Green (#22c55e)
Error:     Red (#ef4444)
Warning:   Yellow (#f59e0b)
Gray Scale: 50-900
```

### Components Library

All components are:

- ✅ Fully typed with TypeScript
- ✅ Accessible with ARIA attributes
- ✅ Responsive across all screen sizes
- ✅ Themeable with Tailwind variants
- ✅ Reusable and composable

---

## 🔒 Security Features

### Client-Side Security

- ✅ **XSS Protection** - React's built-in escaping
- ✅ **JWT Storage** - Secure localStorage management
- ✅ **Input Validation** - Client and server-side validation
- ✅ **Password Strength** - Enforced strong passwords
- ✅ **Auto-Logout** - On token expiration or 401 errors
- ✅ **HTTPS** - Recommended for production

### Authentication Flow

1. User submits credentials
2. Client validates input (Zod schema)
3. Request sent to backend with validation
4. JWT token received and stored securely
5. Token attached to all authenticated requests
6. Auto-redirect on 401 errors
7. Clean logout with cache clearing

### Password Requirements

Enforced both client and server-side:

- Minimum 8 characters
- At least one letter (A-Z, a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&\*)

---

## 🔄 State Management

### TanStack Query (React Query)

Used for server state management:

```typescript
// Queries (GET requests)
- User profile data
- Health checks

// Mutations (POST, PATCH, DELETE)
- Sign up
- Sign in
- Update profile
- Change password

// Features
- Automatic caching
- Background refetching
- Optimistic updates
- Error handling
- Loading states
```

**Configuration:**

- Stale time: 5 minutes
- Cache time: 10 minutes
- Retry: 2 attempts (not for 4xx errors)
- Refetch on mount: Yes
- Refetch on window focus: No (dev)

---

## 🧪 Testing

### Test Stack

```bash
Vitest        # Fast unit testing
Testing Library # React component testing
jsdom         # DOM implementation
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# UI mode
npm run test:ui

# Coverage
npm run test:coverage
```

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   └── utils/
```

---

## 📦 Building for Production

### Build Process

```bash
# 1. Run linting
npm run lint

# 2. Build the project
npm run build

# 3. Preview the build
npm run preview
```

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js      # Application code
│   ├── index-[hash].css     # Styles
│   └── vendor-[hash].js     # Dependencies
├── index.html
└── vite.svg
```

### Production Optimizations

- ✅ Code splitting by route
- ✅ Tree shaking for smaller bundles
- ✅ Minification and compression
- ✅ Asset optimization
- ✅ CSS purging (unused styles removed)

---

### Environment Setup

**Production `.env`:**

```env
VITE_API_BASE_URL=https://your-api.com/api/v1
VITE_APP_NAME=Auth Client
VITE_NODE_ENV=production
```

### API Endpoints Used

| Endpoint             | Method | Description       |
| -------------------- | ------ | ----------------- |
| `/auth/signup`       | POST   | Register new user |
| `/auth/signin`       | POST   | Login user        |
| `/users/me`          | GET    | Get user profile  |
| `/users/me`          | PATCH  | Update profile    |
| `/users/me/password` | PATCH  | Change password   |

---

## 🤝 Contributing

### Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature
   ```
3. **Make changes with conventional commits**
   ```bash
   git commit -m "feat(auth): add remember me feature"
   ```
4. **Push to your fork**
   ```bash
   git push origin feat/your-feature
   ```
5. **Open a Pull Request**

### Standards

- ✅ Follow ESLint and Prettier rules
- ✅ Write tests for new features
- ✅ Use conventional commits
- ✅ Update documentation
- ✅ Ensure all tests pass
- ✅ Keep PRs focused and small

---

## 🐛 Troubleshooting

**Port Already in Use**

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Module Not Found**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

**TypeScript Errors**

```bash
# Restart TypeScript server in VS Code
# Command Palette -> "TypeScript: Restart TS Server"
```

**Husky Not Working**

```bash
# Reinstall hooks
npm run prepare
```

---

## 📚 Technology Stack

### Core

| Technology     | Version | Purpose      |
| -------------- | ------- | ------------ |
| React          | 19.2    | UI library   |
| TypeScript     | 5.9     | Type safety  |
| Vite           | 7.2     | Build tool   |
| React Router   | 7.9     | Routing      |
| TanStack Query | 5.90    | Server state |

### UI & Styling

| Technology   | Version | Purpose        |
| ------------ | ------- | -------------- |
| Tailwind CSS | 4.1     | Styling        |
| Lucide React | Latest  | Icons          |
| PostCSS      | 8.5     | CSS processing |

### Forms & Validation

| Technology          | Version | Purpose               |
| ------------------- | ------- | --------------------- |
| React Hook Form     | 7.67    | Form management       |
| Zod                 | 4.1     | Schema validation     |
| @hookform/resolvers | 5.2     | RHF + Zod integration |

### HTTP & State

| Technology | Version | Purpose                 |
| ---------- | ------- | ----------------------- |
| Axios      | 1.13    | HTTP client             |
| Zustand    | 5.0     | Client state (optional) |

### Development Tools

| Technology      | Version | Purpose           |
| --------------- | ------- | ----------------- |
| ESLint          | 9.39    | Linting           |
| Prettier        | 3.7     | Formatting        |
| Husky           | 9.1     | Git hooks         |
| Commitlint      | 20.1    | Commit validation |
| Vitest          | 4.0     | Testing           |
| Testing Library | 16.3    | Component testing |

---

## 📝 License

This project is **UNLICENSED**

---

## 🙏 Acknowledgments

Built with:

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [TanStack Query](https://tanstack.com/query) - Server state management
- [React Router](https://reactrouter.com/) - Routing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Hook Form](https://react-hook-form.com/) - Form management
- [Zod](https://zod.dev/) - Schema validation
- [Axios](https://axios-http.com/) - HTTP client

---

<div align="center">

**Made with ❤️ and TypeScript**

</div>
