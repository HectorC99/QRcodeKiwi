import React from 'react'
import Logo from '../components/Logo'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Scanned() {
  const { id } = useParams()
  const [message, setMessage] = React.useState('')
  const [name, setName] = React.useState('')

  const fetchMessage = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/messages/${id}`)
      setMessage(data.message)
      setName(data.name)
    } catch (error) {
      console.error('Error fetching message:', error)
    }
  }

  React.useEffect(() => {
    fetchMessage()
  }, [])

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-20">
      <Logo />
      <div className="flex flex-col mt-10 w-96">
        <p className="w-full mr-2 px-4 py-2 border rounded-full bg-white">{name}</p>
        <p className="w-full mr-2 px-4 py-2 border rounded-full bg-white">{message}</p>
      </div>
    </div>
  )
}

export default Scanned