import axios from 'axios'
const baseUrl = '/api/users'

const getUserInfo = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


export default getUserInfo