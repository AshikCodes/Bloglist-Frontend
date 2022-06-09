import { useState } from "react";

const CreateBlog = ({addNewBlog, visibility, setVisibility}) => {

    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const hideWhenVisible = {display: visibility ? 'none': ''}
    const showWhenVisible = {display: visibility ? '' : 'none'}

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl,
            likes:0
            }

        addNewBlog(newBlog)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return ( 
        <div className="addBlog-container">
            <div style={hideWhenVisible}>
                <button onClick={() => setVisibility(true)} className="creatBlog-btn">create</button>
            </div>
            {visibility && <form onSubmit={addBlog}>
            <label>Title:</label><input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} name="blog-title"/>
            <label>Author:</label><input type="text" value={blogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} name="blog-author"/>
            <label>Url:</label><input type="text" value={blogUrl} onChange={(e) => setBlogUrl(e.target.value)} name="blog-url"/>
            <div style={showWhenVisible}>
                <button type='submit'>create blog</button>
            </div>
            <div style={showWhenVisible}>
                <button className="cancel-form-btn" onClick={() => setVisibility(false)}>cancel</button>
            </div>
            </form>}
      </div>
     );
}
 
export default CreateBlog;