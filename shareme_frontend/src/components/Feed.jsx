import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import { Spinner, MasonryLayout } from './index'

const Feed = () => {

  const [loading, setLoading] = useState(true)
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams()

  useEffect(() => {

    setLoading(true)

    if (categoryId) {

      const query = searchQuery(categoryId)

      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })

    } else {
      
      client.fetch(feedQuery)
      .then((data) => {
          setPins(data)
          setLoading(false)
        })

    }

  }, [categoryId])


  if (loading) return <Spinner message='We are adding new ideas to your feed...!!' />

  if(pins?.length ===0) return <div className="mt-10 text-center text-xl ">No Pins Available.</div>


  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed