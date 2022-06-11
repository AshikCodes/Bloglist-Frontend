import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const request = await axios.get(baseUrl)
  console.log("request.data is", request.data)
  // return request.then(response => response.data)
  return request.data
}

const getUserBlogs = async (id) => {
  const request = await axios.get(`/api/blogs/${id}`)
  console.log("Request here is", request)
  return request.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.post(baseUrl,newBlog,config)
  return response.data
}


const updateBlog = async (newBlog,id) => {
  const response = await axios.put(`/api/blogs/${id}`,newBlog)
  return response.data
}



export default { getAll, setToken,createBlog, getUserBlogs, updateBlog }