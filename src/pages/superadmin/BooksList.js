import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import supabase from "../../supabaseClient";
import Dropdown from "./Dropdown";

const BookList = () => {
  // Modal start
  const [showModal, setShowModal] = useState(false);
  const [bookNumber, setBookNumber] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [bookData, setBookData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "History and Geography",
    "Literature",
    "Psychology and Philosophy",
    "Natural Sciences"
  ];

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase.from("books").select("*");
      if (error) throw error;
      setBookData(data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleCreateBook = async () => {
    try {
      const { data, error } = await supabase.from("books").insert([
        {
          ddcid: bookNumber,
          title: title,
          category: category,
          status: true,
          author: author,
        },
      ]);
      if (error) throw error;
      setBookData([...bookData, data[0]]);
      handleCloseModal(); 
      await fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
  };
  

  const resetForm = () => {
    setBookNumber("");
    setTitle("");
    setAuthor("");
    setCategory("");
  };

  const handleDelete = async (ddcid, title) => {
    try {
      const { error } = await supabase
        .from("books")
        .delete()
        .eq("ddcid", ddcid);
      if (error) throw error;
      setBookData(bookData.filter((item) => item.ddcid !== ddcid));
      alert(`The book "${title}" is deleted.`);
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  const handleUpdate = (ddcid, title) => {
    // Handle update action
    alert(`The book "${title}" with ID ${ddcid} is updated.`);
  };

  const rowActions = (ddcid, title) => [
    { label: "Update", onClick: () => handleUpdate(ddcid, title) },
    { label: "Delete", onClick: () => handleDelete(ddcid, title) },
  ];

  const filteredData = bookData.filter((item) =>
    selectedCategory === "All" || item.category === selectedCategory
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

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
          className="w-fit py-3 px-4 xl:ml-60 md:ml-32 bg-gray rounded-xl shadow-sm focus:outline-none focus:ring-maroon focus:border-maroon sm:text-sm category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
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
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b border-gray">
                <td className="px-5 py-2">{item.ddcid}</td>
                <td className="px-5 py-2">{item.title}</td>
                <td className="px-5 py-2">{item.author}</td>
                <td className="px-5 py-2">{item.category}</td>
                <td
                  className={`px-1 py-2 text-center ${
                    item.status === true ? "bg-green" : "bg-red"
                  } m-2 inline-block rounded-xl text-sm w-3/4`}
                >
                  {item.status ? "Available" : "Not Available"}
                </td>
                <td className="px-5">
                  <Dropdown
                    options={rowActions(item.ddcid, item.title)}
                    onSelect={(option) => option.onClick(item.ddcid, item.title)}
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
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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

export default BookList;
