# Humane - HR System

A modern HR management system built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Phase 0 - MVP Foundation

This is the initial MVP implementation with mock authentication and basic app shell.

### Features

- **Mock Authentication**: 4 demo users with role-based access
- **Persistent Login**: Session stored in localStorage (Phase 0)
- **Protected Routes**: Middleware-based route protection
- **Role-Based Navigation**: Dynamic sidebar based on user role
- **App Shell**: Sidebar + Topbar layout with user menu

### Demo Users

| Email | Role | Password |
|-------|------|----------|
| yomna.employee@mail.com | employee | 1234 |
| manager@mail.com | manager | 1234 |
| ahmed.hr@mail.com | hr | 1234 |
| Ali.finance@mail.com | finance | 1234 |
| admin@mail.com | super_admin | 1234 |

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Login with one of the demo users above

### Project Structure

```
/app
  /(app)              # Authenticated routes (app shell)
    /employee         # Employee routes
    /manager          # Manager routes
    /hr               # HR routes
    /finance          # Finance routes
  /login              # Login page
/components
  /ui                 # shadcn/ui components
  app-sidebar.tsx     # Sidebar navigation
  app-topbar.tsx      # Topbar with user menu
/lib
  auth.ts             # Auth utilities (mock)
  utils.ts            # Utility functions
middleware.ts         # Route protection middleware
```

### Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **Radix UI** primitives

### Notes

- Phase 0 uses localStorage and cookies for session management (non-httpOnly)
- Real authentication will replace this in future phases
- All routes are protected except `/login`
- Cross-role access is blocked by middleware
