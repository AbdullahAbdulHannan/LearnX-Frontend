import React, { useState } from "react";
import { UserData } from "../context/user-context";

const SupportPage = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };
 const {user}=UserData()

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-sm p-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500">learnX</h1>
          <h2 className="text-xl font-semibold">Support</h2>
        </div>
      </header>

      <main className="container mx-auto bg-white p-6 rounded shadow-md">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left font-semibold text-blue-600 focus:outline-none"
                >
                  {faq.question}
                </button>
                {faqOpen === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded"
              value={user.email}
            />
            <textarea
              rows="4"
              placeholder="Describe your issue"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Other Support Channels</h2>
          <p>
            📧 Email us at: <a href="mailto:support@learnx.com" className="text-blue-600">support@learnx.com</a>
          </p>
          <p>📞 Call us: +123 456 7890</p>
        </section>
      </main>

      <footer className="mt-8 p-4 text-center text-gray-500">
        &copy; 2024 learnX. All rights reserved.
      </footer>
    </div>
  );
};

const faqData = [
  {
    question: "How can I reset my password?",
    answer: "To reset your password, click on 'Forgot Password' on the login page.",
  },
  {
    question: "How do I access my courses?",
    answer: "Once logged in, go to 'My Courses' in the dashboard.",
  },
  // Add more FAQs as needed
];

export default SupportPage;
