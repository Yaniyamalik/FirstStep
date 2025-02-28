import React,{useState} from 'react'
import { Dashboard } from '../Navbar/Dashboard'
import "./Create.css"
export const Create = () => {
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = {
      title,
      description,
      image,
      isPublished,
    };

    console.log('Blog Created:', blogData);
    // You can make an API call here to save the blog data in your database
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview image URL
    }
  };
  return (
    <div>
        <Dashboard/>

  
    <div className="blog-creation-page">
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the blog title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Blog Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short description of the blog"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Featured Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <div className="image-preview">
              <img src={image} alt="Featured" width="100" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
            />
            Publish Immediately
          </label>
        </div>

        <button type="submit" className="submit-btn">
          {isPublished ? 'Publish' : 'Save as Draft'}
        </button>
      </form>
    </div>
  );
};

export default BlogCreationPage;

    </div>
  )
}
export default Create