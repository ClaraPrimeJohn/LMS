import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Dropdown from "./Dropdown";

const BookList = () => {
  // Modal start
  const [showModal, setShowModal] = useState(false);
  const [bookNumber, setBookNumber] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleCreateBook = () => {
    const newBook = {
      BookNumber: bookNumber,
      Title: title,
      Author: author,
      Category: category,
      Status: "Available",
    };

    // Add the new book to the list
    setBookData([...bookData, newBook]);

    // Reset form fields and close modal
    handleCloseModal();
  };
  // Modal end

  // Dropdown category and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Category data
  const categories = [
    "All",
    "History and Geography",
    "Literature",
    "Psychology and Philosophy",
    "Natural Sciences",
  ];

  // Sample data
  const [bookData, setBookData] = useState([
    {
      BookNumber: 909,
      Title: "Sapiens: A Brief History of Humankind",
      Author: "Yuval Noah Harari",
      Category: "History and Geography",
      Status: "Available",
    },
    {
      BookNumber: 813.5,
      Title: "To Kill a Mockingbird",
      Author: "Harper Lee",
      Category: "Literature",
      Status: "Available",
    },
    {
      BookNumber: 158.1,
      Title: "The Power of Habit: Why We Do What We Do in Life and Business",
      Author: "Charles Duhigg",
      Category: "Psychology and Philosophy",
      Status: "Not Available",
    },
    {
      BookNumber: 813.54,
      Title: "The Da Vinci Code",
      Author: "Dan Brown",
      Category: "Literature",
      Status: "Not Available",
    },
    {
      BookNumber: 576.8,
      Title: "The Origin of Species",
      Author: "Charles Darwin",
      Category: "Natural Sciences",
      Status: "Available",
    },
  ]);

  // Dropdown category and search
  const filteredData = bookData.filter((item) =>
    selectedCategory === "All" || item.Category === selectedCategory
      ? item.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Category.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  const resetForm = () => {
    setBookNumber("");
    setTitle("");
    setAuthor("");
    setCategory("");
  };

  const handleDelete = (bookNumber) => {
    // Handle delete action
    alert("Delete book", bookNumber);
  };

  const handleUpdate = (bookNumber) => {
    // Handle update action
    alert("Update book", bookNumber);
  };

  const rowActions = (bookNumber) => [
    { label: "Update", onClick: () => handleUpdate(bookNumber) },
    { label: "Delete", onClick: () => handleDelete(bookNumber) },
  ];

  return (
    <div className="px-3 flex-1">
      <div className="bg-white my-3 px-2 py-2 rounded-xl shadow-lg flex justify-between search-container">
        <div className="flex items-center w-full">
          <BiSearch className="text-3xl mx-2 my-2 sm:text-4xl" />

          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 border border-opacity-25 rounded-3xl focus:outline-none focus:ring-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          id="category"
          name="category"
          className="w-fit py-3 px-4 xl:ml-60 md:ml-32 bg-gray rounded-xl shadow-sm focus:outline-none focus:ring-maroon focus:border-maroon sm:text-sm category "
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-table overflow-y-auto rounded-xl custom-scrollbar">
        <table className="bg-white w-full rounded-2xl px-2 py-2 shadow-xl">
          <thead>
            <tr className="pb-2">
              <th colSpan="10">
                <div className="flex justify-between items-center px-5 py-4">
                  <h2 className="text-xl text-black">Book list</h2>
                  <button
                    className="bg-white text-black border rounded-xl p-3 hover:bg-maroon hover:text-white"
                    onClick={handleOpenModal}
                  >
                    Add Book
                  </button>
                </div>
              </th>
            </tr>

            <tr className="text-left text-black text-xl border-b border-gray">
              <th className="px-5 py-4">DDC ID</th>
              <th className="px-5 py-4">Title of the book</th>
              <th className="px-5 py-4">Author</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.BookNumber} className="border-b border-gray">
                <td className="px-5 py-2">{item.BookNumber}</td>
                <td className="px-5 py-2">{item.Title}</td>
                <td className="px-5 py-2">{item.Author}</td>
                <td className="px-5 py-2">{item.Category}</td>
                <td
                  className={`px-1 py-2 text-center ${
                    item.Status === "Available" ? "bg-green" : "bg-red"
                  } m-2 inline-block rounded-xl text-sm w-3/4`}>
                  {item.Status}
                </td>
                <td className="px-5">
                  <Dropdown
                    options={rowActions(item.studentNumber)}
                    onSelect={(option) => option.onClick(item.studentNumber)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-10 flex justify-center items-center shadow-2xl"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-peach p-8 rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Book Information
            </h2>

            <div className="grid grid-cols-2 gap-10 ">
              <div className="flex flex-col w-72">
                <label className="text-md">DDC ID</label>
                <input
                  type="number"
                  placeholder="DDC ID"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={bookNumber}
                  onChange={(e) => setBookNumber(e.target.value)}
                />

                <label className="text-md">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-72">
                <label className="text-md">Author</label>
                <input
                  type="text"
                  placeholder="Author"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />

                <label className="text-md">Category</label>
                <input
                  type="text"
                  placeholder="Category"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                className="bg-maroon text-white py-2 px-4 rounded-lg mr-2"
                onClick={handleCreateBook}
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList
