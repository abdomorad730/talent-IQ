import { Navigate, Route, Routes } from "react-router"
import HomePage from "./Pages/HomePage"
import AboutPage from "./Pages/AboutPage"
import ProplemsPage from "./Pages/ProplemsPage"
import { useUser } from "@clerk/clerk-react"
import { Toaster } from "react-hot-toast"
import Dashboard from "./Pages/Dashboard"

function App() {

  const {isSignedIn,isLoaded} = useUser()
  if(!isLoaded) return null
  return (
    <>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={!isSignedIn? <HomePage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to="/"  />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/problems" element={isSignedIn ? <ProplemsPage /> : <Navigate to="/"  />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
