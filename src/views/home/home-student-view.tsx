import CardClass from '@/components/card/card-class'
import React from 'react'

const HomeStudentView = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
      {Array.from({ length: 20 }).map((_, i) => (
        <CardClass key={i} i={i} />
      ))}
    </div>
  )
}

export default HomeStudentView
