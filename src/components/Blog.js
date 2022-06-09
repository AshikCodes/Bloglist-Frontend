import { useState } from "react"

const Blog = ({blog}) => {
  const [view, setView] = useState(false)

  const hideWhenVisible = {display: view ? 'none' : ''}
  const showWhenVisible = {display: view ? '': 'none'}

  return ( 
    <div className="blog-container">
        {blog.title}  
        <button onClick={() => setView(true)} style={hideWhenVisible}>view</button>
        <button onClick={() => setView(false)} style={showWhenVisible}>hide</button>
          {view && <div className="expanded-view-container">
            <li className="extra-blog-info">
              <ul>{blog.url}</ul>
              <ul>{blog.likes}</ul>
              <ul>{blog.author}</ul>
            </li>
          </div>}
    </div> 
   );
}
 
export default Blog;