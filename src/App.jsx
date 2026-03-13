import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Profile from './pages/Profile'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import ActivityLogs from './pages/ActivityLogs'
import About from './pages/About'
import TestScenarios from './pages/TestScenarios'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/activity" element={<ActivityLogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/test-scenarios" element={<TestScenarios />} />
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
