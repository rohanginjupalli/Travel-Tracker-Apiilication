import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl">Travel Tracker</div>
        <div>
            <Link to="/" className="mx-4 hover:underline">Dashboard</Link>
            <Link to="/new-trip" className="mx-4 hover:underline">New Trip</Link>
        </div>
    </nav>
  )
}

export default NavBar