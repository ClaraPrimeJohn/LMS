import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const UserSearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Default");

  const categories = [
    "Default",
    "History and Geography",
    "Literature",
    "Psychology and Philosophy",
    "Natural Sciences",
  ];

  const bookData = [
    {
      ddcId: 909,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      category: "History and Geography",
      status: "Available",
    },
    {
      ddcId: 813.5,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Literature",
      status: "Available",
    },
    {
      ddcId: 158.1,
      title: "The Power of Habit: Why We Do What We Do in Life and Business",
      author: "Charles Duhigg",
      category: "Psychology and Philosophy",
      status: "Not Available",
    },
    {
      ddcId: 813.54,
      title: "The Da Vinci Code",
      author: "Dan Brown",
      category: "Literature",
      status: "Not Available",
    },
    {
      ddcId: 576.8,
      title: "The Origin of Species",
      author: "Charles Darwin",
      category: "Natural Sciences",
      status: "Available",
    },
    
  ];

  const filteredData = bookData.filter((item) =>
    selectedCategory === "Default" || item.category === selectedCategory
      ? [item.title, item.author].some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      : false
  );

  return (
    <div className="px-4 flex-1">
      <div className="bg-white my-4 px-2 py-2 rounded-xl shadow-lg flex justify-between">
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

      <div className="book-table overflow-y-auto rounded-xl custom-scrollbar">
        <table className="bg-white w-full rounded-2xl px-2 py-2 shadow-xl">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left text-black text-base border-b border-gray">
              <th className="px-3 py-4">DDC ID</th>
              <th className="px-3 py-4">Title of the Book</th>
              <th className="px-3 py-4">Author</th>
              <th className="px-3 py-4">Category</th>
              <th className="px-3 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.ddcId} className="border-b border-gray text-sm ">
                <td className="px-2 py-2">{item.ddcId}</td>
                <td className="px-2 py-2">{item.title}</td>
                <td className="px-2 py-2">{item.author}</td>
                <td className="px-2 py-2">{item.category}</td>
                <td
                  className={`px-1 py-2 text-center ${
                    item.status === "Available" ? "bg-green" : "bg-red"
                  } m-2 inline-block rounded-xl text-sm w-3/4`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSearchBooks;
