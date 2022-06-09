import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
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

  const [visibility, setVisibility] = useState(false)


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
  
  const addNewBlog = async (blogObject) => {
    try {
      await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(blogObject))
      user.blog = user.blog.concat(blogObject)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setVisibility(false)
      setMsg(`a new blog ${blogObject.title} by ${user.name} added`)
      setTimeout(() => {
        setMsg('')
      },3000)
    }
    catch(error){
      console.log("error adding new blog", error)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {msg !== '' && <h1 className='successMsg-container'>{msg}</h1>}
      {errorMsg !== '' && <h1 className='errorMsg-container'>{errorMsg}</h1>}
      {user == null && 
      <Login
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
        username={username}
        password={password}>
      </Login>
      }
      {user != null && <div className="notes">
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      </div>}
      {user != null && 
      <CreateBlog
        addNewBlog={addNewBlog}
        // blogTitle={blogTitle}
        // blogAuthor={blogAuthor}
        // blogUrl={blogUrl}
        // setBlogTitle={setBlogTitle}
        // setBlogAuthor={setBlogAuthor}
        // setBlogUrl={setBlogUrl}
        visibility={visibility} 
        setVisibility={setVisibility}>
      </CreateBlog>
      }
      {blogs != null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
