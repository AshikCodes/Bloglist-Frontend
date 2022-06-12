import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog,user,setBlogs,setSortedArray,setUser}) => {
  const [view, setView] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  

  const hideWhenVisible = {display: view ? 'none' : ''}
  const showWhenVisible = {display: view ? '': 'none'}

  const handleLikeClick = async (blog) => {
    console.log("likeCount here is", likeCount)
    console.log("blog here is", blog)
    const id = blog.id
    console.log("id is", id)

    const actualBlog = await blogService.getUserBlogs(id)
    console.log("actualBlog is", actualBlog)

    try {
      const updatedBlog = {
        user: [blog.user[0]],
        likes: actualBlog.likes + 1,
        author: blog.author,
        id: actualBlog.id,
        title: blog.title,
        url: blog.url
      }
      setLikeCount(updatedBlog.likes)

      var elementPos = user.blog.map(ranBlog => {return ranBlog.id}).indexOf(blog.id)
      user.blog[elementPos] = updatedBlog
      // setBlogs(user.blog)
      // setSortedArray(user.blog)
      // setSortedArray(user.blog.sort((a,b) => parseInt(b.likes) - parseInt(a.likes)))
      setUser(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))


      console.log("updated blog like is", updatedBlog)
      const result = await blogService.updateBlog(updatedBlog,id)
      console.log("user.blog is", user.blog)
      console.log("Result in liking blog is", result)

    }
    catch(error){
      console.log("error liking blog")
    }
  }

  return ( 
    <div className="blog-container">
        {blog.title}  
        <button onClick={() => setView(true)} style={hideWhenVisible}>view</button>
        <button onClick={() => setView(false)} style={showWhenVisible}>hide</button>
          {view && <div className="expanded-view-container">
            <li className="extra-blog-info">
              <ul>{blog.url}</ul>
              {/* {<ul>likes: {blog.likes} <button onClick={() => handleLikeClick(blog)}>like</button></ul>} */}
            {likeCount === 0 && <ul>likes: {blog.likes} <button onClick={() => handleLikeClick(blog)}>like</button></ul>}
            {likeCount !== 0 && <ul>likes: {likeCount} <button onClick={() => handleLikeClick(blog)}>like</button></ul>}
              <ul>{blog.author}</ul>
              <ul>{blog.id}</ul>
            </li>
          </div>}
    </div> 
   );
}
 
export default Blog;