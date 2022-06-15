import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog,user,setUser,handleLikeClick,likeCount }) => {
  const [view, setView] = useState(false)
  // const [likeCount, setLikeCount] = useState(0)
  const [deleted, setDeleted] = useState(false)


  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '': 'none' }
  const hideWhenDeleted = { display: deleted ? 'none': '' }

  // const handleLikeClick = async (blog) => {
  //   console.log('likeCount here is', likeCount)
  //   console.log('blog here is', blog)
  //   const id = blog.id
  //   console.log('id is', id)

  //   const actualBlog = await blogService.getUserBlogs(id)
  //   console.log('actualBlog is', actualBlog)

  //   try {
  //     const updatedBlog = {
  //       user: [blog.user[0]],
  //       likes: actualBlog.likes + 1,
  //       author: blog.author,
  //       id: actualBlog.id,
  //       title: blog.title,
  //       url: blog.url
  //     }
  //     setLikeCount(updatedBlog.likes)

  //     var elementPos = user.blog.map(ranBlog => {return ranBlog.id}).indexOf(blog.id)
  //     user.blog[elementPos] = updatedBlog
  //     setUser(user)
  //     window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))


  //     console.log('updated blog like is', updatedBlog)
  //     const result = await blogService.updateBlog(updatedBlog,id)
  //     console.log('user.blog is', user.blog)
  //     console.log('Result in liking blog is', result)

  //   }
  //   catch(error){
  //     console.log('error liking blog')
  //   }
  // }

  const handleDelete = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      var elementPos = user.blog.map(ranBlog => {return ranBlog.id}).indexOf(blog.id)
      user.blog.splice(elementPos,1)
      setUser(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      const blogToDelete = await blogService.deleteBlog(blog.id)
      console.log('blogToDelete is', blogToDelete)
      setDeleted(true)
    }
    else {
      console.log('You canceled')
    }
  }

  return (
    <div className="blog-container" style={hideWhenDeleted}>
      <div className="title-container">
        {blog.title}
      </div>
      <div className="author-container">
        {blog.author}
      </div>
      <button onClick={() => setView(true)} style={hideWhenVisible}>view</button>
      <button onClick={() => setView(false)} style={showWhenVisible}>hide</button>
      {view && <div className="expanded-view-container">
        <li className="extra-blog-info">
          <div className="url-container">
            <ul>{blog.url}</ul>
          </div>
          <div className="likes-container">
            {likeCount === 0 && <ul>likes: {blog.likes} <button onClick={() => handleLikeClick(blog)}>like</button></ul>}
            {likeCount !== 0 && <ul>likes: {likeCount} <button onClick={() => handleLikeClick(blog)}>like</button></ul>}
          </div>
          {/* {<ul>likes: {blog.likes} <button onClick={() => handleLikeClick(blog)}>like</button></ul>} */}
          {/* <ul>{blog.author}</ul> */}
          <ul>{blog.id}</ul>
          <button className="delete-blog-btn" onClick={() => handleDelete(blog)}>remove</button>
        </li>
      </div>}
    </div>
  )
}

export default Blog