import { useState } from 'react'
import './App.css'
import SummaryCard from './Components/SummaryCard'
import AppilicationTitle from './Components/AppilicationTitle'
import DestinationCard from './Components/DestinationCard'

function App() {

  const arrayOfSummaryCard = [
  {
    title: "Total Trips",
    value: 12
  },
  {
    title: "Countries Visited",
    value: 8
  },
  {
    title: "Upcoming Trips",
    value: 3
  },
  {
    title: "Photos Taken",
    value: 742
  }
];

  return (
    <div>
      <AppilicationTitle  />
      <div className='flex m-5 gap-4'>
          {arrayOfSummaryCard.map((obj)=>{
          return <SummaryCard arrayOfSummaryCard={obj} />
        })}
      </div>
      <div className='flex mt-10 ml-6 gap-4'>
        <DestinationCard />
        <DestinationCard />
        <DestinationCard />
      </div>
      
    </div>
  )

}

export default App
