# API Backend Dashboard - Frontend

A modern React + Vite application with Bootstrap UI for the API Backend system. Features JWT authentication, role-based dashboards, and complete user management.

## Features

- 🔐 **JWT Authentication** - Secure login with token-based authentication
- 👥 **User Management** - Full CRUD operations (admin only)
- 🎨 **Modern UI** - Bootstrap 5 with responsive design
- 🚀 **Fast Development** - Vite for instant HMR
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🔒 **Role-Based Access** - Admin and user dashboards
- 🎯 **Protected Routes** - Automatic authentication checks

## Tech Stack

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool
- **React Router 6.21** - Client-side routing
- **Bootstrap 5.3** - CSS framework
- **React-Bootstrap 2.9** - Bootstrap components for React
- **Axios 1.6** - HTTP client
- **jwt-decode 4.0** - JWT token parsing

## Prerequisites

- Node.js 18+ installed
- Backend API running on http://127.0.0.1:5000
- npm or yarn package manager

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to:
```
http://localhost:5173
```

## Demo Credentials

### Admin Account
- Email: `admin@example.com`
- Password: `Admin@123`

### User Account
- Email: `john@example.com`
- Password: `User@123`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Main layout with sidebar
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── Sidebar.jsx         # Side navigation menu
│   │   ├── PrivateRoute.jsx    # Protected route wrapper
│   │   ├── AdminDashboard.jsx  # Admin dashboard view
│   │   └── UserDashboard.jsx   # User dashboard view
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── Users.jsx           # User management (admin)
│   │   ├── Profile.jsx         # User profile
│   │   ├── About.jsx           # About page
│   │   └── NotFound.jsx        # 404 page
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── services/
│   │   └── api.js              # Axios API service
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js             # Vite configuration
└── index.html
```

## API Integration

The frontend communicates with the backend API through Axios. API calls are handled in `src/services/api.js` with automatic JWT token injection.

### API Base URL
The API is proxied through Vite: `/api` → `http://127.0.0.1:5000`

### Authentication Flow
1. User logs in → receives JWT token
2. Token stored in localStorage
3. Token automatically included in API requests
4. Token decoded to get user info (id, role)
5. Protected routes check authentication status

## Key Components

### AuthContext
Manages authentication state, login, logout, and user information.

### PrivateRoute
Protects routes from unauthenticated access. Redirects to login if not authenticated.

### Layout
Main application layout with sidebar navigation and top navbar.

### Dashboard
Role-based dashboard that shows different views for admins and regular users.

### Users Page (Admin Only)
- View all users in a table
- Add new users
- Edit existing users
- Delete users
- Role assignment

### Profile Page
- View personal information
- Edit profile details
- Change password

## Features by Role

### Admin
✅ Full dashboard with system statistics  
✅ User management (CRUD operations)  
✅ View all users  
✅ Create/edit/delete users  
✅ Assign roles  
✅ Profile management  

### Regular User
✅ Personal dashboard  
✅ View own statistics  
✅ Profile management  
✅ Edit own information  
✅ Change password  

## Password Requirements

When creating or updating passwords:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 digit
- At least 1 special character

## Security Features

- JWT token authentication
- Automatic token refresh
- Protected routes
- Role-based access control
- Secure password handling
- CSRF protection via tokens

## Development Tips

1. **Hot Reload**: Changes to React components reload instantly
2. **API Proxy**: No CORS issues in development (handled by Vite)
3. **Console Logging**: Check browser console for errors
4. **React DevTools**: Install for component debugging

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## Troubleshooting

### Login Issues
- Ensure backend is running on port 5000
- Check console for API errors
- Verify demo credentials

### API Connection Errors
- Confirm backend server is running
- Check Vite proxy configuration
- Inspect network tab in browser DevTools

### Token Expired
- Tokens expire after 1 hour
- Log out and log back in
- Clear localStorage if needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes to teach API testing and automation.

## Support

For issues or questions, refer to the backend documentation or check the About page in the application.
