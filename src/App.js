import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Mobile Number:
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
      <div>
        <Comments></Comments>
      </div>
    </>
  );
}

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="listItem">
            <strong>Name:</strong> {comment.name}
            <br />
            <strong>Email:</strong> {comment.email}
            <br />
            <strong>Body:</strong> {comment.body}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
