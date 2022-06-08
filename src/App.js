import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'
import './app.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [msg, setMsg] = useState('')

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect( () => {
    // blogService.getAll().then(blogs =>
    //   setBlogs(userBlogs)
    if(user != null){
      setBlogs(user.blog)
    }
    console.log("blogs is", blogs)
  }, [user])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogUser')
    console.log("loggedInUser is", loggedInUser)
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      blogService.setToken(user.token)
      // setBlogs(user.blog)
      console.log("user is", user)
      setUser(user)
    }
    else{
      console.log("Error here,", JSON.parse(loggedInUser))
    }
  },[])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("Logging in,", username, password)
    try {
      console.log("got here")
      const user = await loginService({username, password})
      setBlogs(user.blog)
      console.log("user is", user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(error){
      setErrorMsg('Wrong username or password')
      console.log("got here error")
      setTimeout(() => {
        setErrorMsg('')
      },3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setBlogs([])
  }

  const addNewBlog = async (e) => {
    e.preventDefault()

    console.log("User here is", user)

    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }
      await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(newBlog))
      user.blog = user.blog.concat(newBlog)
      console.log("New USER IS ", user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setMsg(`a new blog ${newBlog.title} by ${user.name}`)
      setTimeout(() => {
        setMsg('')
      },3000)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    }
    catch(error){
      console.log("error adding new blog", error)
    }

    console.log("blogs is", blogs)
  }

  return (
    <div>
      <h2>blogs</h2>
      {msg !== '' && <h1 className='successMsg-container'>{msg}</h1>}
      {errorMsg !== '' && <h1 className='errorMsg-container'>{errorMsg}</h1>}
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
      {user != null && <div className="addBlog-container">
      <b>create new</b>
      <form onSubmit={addNewBlog}>
        <label>Title:</label><input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} name="blog-title"/>
        <label>Author:</label><input type="text" value={blogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} name="blog-author"/>
        <label>Url:</label><input type="text" value={blogUrl} onChange={(e) => setBlogUrl(e.target.value)} name="blog-url"/>
        <button type='submit'>create blog</button>
      </form>
      </div>}
      {blogs != null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
