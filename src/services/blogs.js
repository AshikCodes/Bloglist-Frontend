import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  console.log("request.data is", request.data)
  // return request.then(response => response.data)
  return request.data
}

export default { getAll }