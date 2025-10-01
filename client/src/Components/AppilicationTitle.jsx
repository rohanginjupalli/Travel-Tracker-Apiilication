import React from 'react'

function AppilicationTitle() {
  return (
    <div className=' flex my-5 mx-5 justify-between '>
        <div>
            <p><strong>Your Travel Dashboard</strong></p>
            <h1>plan, track, and manage your adventures</h1>
        </div>
        <div>
            <button className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>+ New Trip</button>
        </div>
    </div>
  )
}

export default AppilicationTitle