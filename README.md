# React Frontend — API Testing Dashboard

A modern React + Vite frontend for the API Backend system. Provides a full UI for JWT authentication, user management, projects, tasks, and analytics with role-based dashboards.

---

## 🔗 Related Repository

**Flask Backend API:** Clone and run the backend before starting the frontend.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- Backend API running at **http://localhost:5000**

### Setup

```bash
# 1. Clone this repo
git clone https://github.com/Hashir-Akram/REACT_FRONTEND_API_TESTING.git
cd REACT_FRONTEND_API_TESTING

# 2. Install dependencies
npm install

# 3. Create environment file
echo VITE_API_URL=http://localhost:5000 > .env

# 4. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔑 Demo Credentials

| Role  | Email             | Password  |
|-------|-------------------|-----------|
| Admin | admin@example.com | Admin@123 |
| User  | john@example.com  | John@123  |

---

## 📄 Pages

| Page            | Path              | Access        |
|-----------------|-------------------|---------------|
| Login           | /login            | Public        |
| Dashboard       | /dashboard        | All users     |
| Profile         | /profile          | All users     |
| Projects        | /projects         | All users     |
| Tasks           | /tasks            | All users     |
| Users           | /users            | Admin only    |
| Activity Logs   | /activity-logs    | Admin only    |
| About           | /about            | All users     |

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool with HMR
- **React Router 6** — Client-side routing
- **Bootstrap 5 + React-Bootstrap** — UI components
- **Axios** — HTTP client
- **jwt-decode** — JWT token parsing

---

## 📁 Project Structure

```
src/
├── main.jsx              # App entry point
├── App.jsx               # Routes & layout
├── context/
│   └── AuthContext.jsx   # Auth state & JWT handling
├── services/
│   └── api.js            # Axios instance & interceptors
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Layout.jsx
│   ├── PrivateRoute.jsx
│   ├── AdminDashboard.jsx
│   └── UserDashboard.jsx
└── pages/
    ├── Login.jsx
    ├── Dashboard.jsx
    ├── Profile.jsx
    ├── Projects.jsx
    ├── Tasks.jsx
    ├── Users.jsx
    ├── ActivityLogs.jsx
    ├── About.jsx
    └── NotFound.jsx
```

---

## ⚙️ Environment Variables

| Variable        | Default                   | Description              |
|-----------------|---------------------------|--------------------------|
| VITE_API_URL    | http://localhost:5000     | Backend API base URL     |

Create a `.env` file in the root with your backend URL:
```
VITE_API_URL=http://localhost:5000
```
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
