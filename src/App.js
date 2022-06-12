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
  const [sortedArray, setSortedArray] = useState(null)

  const [visibility, setVisibility] = useState(false)


  useEffect( () => {
    // blogService.getAll().then(blogs =>
    //   setBlogs(userBlogs)
    console.log("got here")
    if(user != null){
      setBlogs(user.blog)
      setSortedArray(user.blog.sort((a,b) => parseInt(b.likes) - parseInt(a.likes)))
    }
    console.log("blogs is", blogs)
  }, [user,sortedArray])

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
      setSortedArray(user.blog.sort((a,b) => parseInt(b.likes) - parseInt(a.likes)))
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
    setSortedArray([])

  }

  const addNewBlog = async (blogObject) => {
    try {
      const result = await blogService.createBlog(blogObject)
      const result2 = await blogService.getUserBlogs(result.blog.slice(-1)[0])
      console.log("RESULT 2 is", result2)
      // setBlogs(result2)
      console.log("blogs is", blogs)
      // user.blog = user.blog.concat(blogObject)
      user.blog = user.blog.concat(result2)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setBlogs(user.blog)
      setSortedArray(user.blog.sort((a,b) => parseInt(b.likes) - parseInt(a.likes)))
      console.log("USER USER USER IS", user)
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
        visibility={visibility} 
        setVisibility={setVisibility}>
      </CreateBlog>
      }
      {/* {blogs !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
      )} */}
      {sortedArray !== null && sortedArray.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} setSortedArray={setSortedArray} user={user} setUser={setUser} />
      )}
    </div>
  )
}

export default App
