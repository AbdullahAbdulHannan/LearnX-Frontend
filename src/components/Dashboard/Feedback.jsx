import React, { useState } from "react";
import { UserData } from "../context/user-context";

const FeedbackForm = () => {
    const {user}=UserData()
  const [feedback, setFeedback] = useState({
    name: "",
    email:user.email,
    rating: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", feedback);
    // Reset the form
    setFeedback({ name: "", email: "", rating: "", comments: "" });
    alert("Thank you for your feedback!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-myBlue">
          Feedback Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-2 border rounded"
            required
          />
          <div>
            <label className="block text-gray-700">Rating:</label>
            <select
              name="rating"
              value={feedback.rating}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>
                Select Rating
              </option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <textarea
            name="comments"
            value={feedback.comments}
            onChange={handleChange}
            rows="4"
            placeholder="Your Comments"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="!bg-myBlue text-white py-2 px-4 rounded w-full"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
