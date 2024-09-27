import React, { useState } from 'react';

const AnnouncementForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set the form as submitted
    setSubmitted(true);

    // Clear the input fields
    setTitle('');
    setMessage('');

    // Hide the submitted message after 2 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Make an Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-1">Announcement Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium mb-1">Announcement Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-green-600">Announcement will be submitted successfully!</p>
      )}
    </div>
  );
};

export default AnnouncementForm;
