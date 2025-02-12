import React from 'react'
import { useParams } from 'react-router-dom'

const EditOffensive = () => {
    const { id } = useParams()
  return (
    <main>
        id: {id}
    </main>
  )
}

export default EditOffensive