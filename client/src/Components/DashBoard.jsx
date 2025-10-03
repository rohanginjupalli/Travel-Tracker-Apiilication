import React from 'react';
import SummaryCard from './HomePage/SummaryCard';
import AppilicationTitle from './HomePage/AppilicationTitle'
import DestinationCard from './HomePage/DestinationCard'

function DashBoard() {

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
          {arrayOfSummaryCard.map((obj,index)=>{
          return <SummaryCard arrayOfSummaryCard={obj} key={index} />
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

export default DashBoard