import { useState } from 'react'
import './App.css'
import { Router , Route , Routes } from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import NewTrip from './Components/NewTrip'
import NavBar from './Components/NavBar'

function App() {

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <Routes>
          {/* '/' renders Dashboard page (your first image) */}
          <Route path="/" element={<DashBoard />} />

          {/* '/new-trip' renders NewTripForm (your second image) */}
          <Route path="/new-trip" element={<NewTrip />} />
        </Routes>
      </div>
    </div>
  )

}

export default App
