import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect( () => {
    // blogService.getAll().then(blogs =>
    //   setBlogs(userBlogs)
    if(user != null){
      setBlogs(user.blog)
    }
  }, [user])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("Logging in,", username, password)
    try {
      console.log("got here")
      const user = await loginService({username, password})
      
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(error){
      setErrorMsg('Wrong credentials')
      console.log("got here error")
      setTimeout(() => {
        setErrorMsg(null)
      },[])
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setBlogs([])
  }

  return (
    <div>
      <h2>blogs</h2>
      {user == null && <div className="login-form">
      <form onSubmit={handleLogin}>
      <div className="username-container">
        username
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} name='username'/>
      </div>
      <div className="password-container">
        password
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} name='password'/>
      </div>
      <button type='submit'>Login</button>
      </form>
      </div>}
      {user != null && <div className="notes">
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      </div>}
      {blogs != null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
