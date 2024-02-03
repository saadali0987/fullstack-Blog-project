import 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import FooterComp from './components/FooterComp'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import CreatePost from './pages/CreatePost'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<AdminRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
        </Route>
        
      </Routes>
      <FooterComp />
    </BrowserRouter>
  )
}

export default App
