import { Navigate, Route, Routes } from "react-router"
import HomePage from "./Pages/HomePage"
import AboutPage from "./Pages/AboutPage"
import ProplemsPage from "./Pages/ProplemsPage"
import { useUser } from "@clerk/clerk-react"
import { Toaster } from "react-hot-toast"

function App() {

  const {isSignedIn} = useUser()
  return (
    <>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/problems" element={isSignedIn ? <ProplemsPage /> : <Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
