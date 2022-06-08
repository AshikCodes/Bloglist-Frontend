import { useState } from "react";

const CreateBlog = ({addNewBlog,blogTitle,blogAuthor,blogUrl,setBlogTitle,setBlogAuthor,setBlogUrl, visibility, setVisibility}) => {

    const hideWhenVisible = {display: visibility ? 'none': ''}
    const showWhenVisible = {display: visibility ? '' : 'none'}

    return ( 
        <div className="addBlog-container">
            <div style={hideWhenVisible}>
                <button onClick={() => setVisibility(true)} className="creatBlog-btn">create</button>
            </div>
            {visibility && <form onSubmit={addNewBlog}>
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