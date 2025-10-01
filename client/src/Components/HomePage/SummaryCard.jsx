import React from 'react'

function SummaryCard({arrayOfSummaryCard}) {
  return (
    <div className='rounded bg-gray-100 w-50 '>
        <p className='p-2 text-black'><strong>{arrayOfSummaryCard.title}</strong></p>
        <p className='p-2 text-black'>{arrayOfSummaryCard.value}</p>
    </div>
  )
}

export default SummaryCard