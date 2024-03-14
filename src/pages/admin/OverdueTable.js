import React, { useState } from "react";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import Dropdown from "../superadmin/Dropdown";

const OverdueTable = () => {
  // Sample data for demonstration
  const [overdueBooks] = useState([
    {
      studentNumber: "123456",
      name: "John Doe",
      docId: "DDC001",
      title: "Introduction to React",
      status: "Overdue",
    },
    {
      studentNumber: "654321",
      name: "Jane Smith",
      docId: "DDC002",
      title: "JavaScript Basics",
      status: "Overdue",
    },
    {
      studentNumber: "987654",
      name: "Alice Johnson",
      docId: "DDC003",
      title: "HTML Essentials",
      status: "Overdue",
    },
    {
      studentNumber: "246813",
      name: "Bob Johnson",
      docId: "DDC004",
      title: "CSS Mastery",
      status: "Overdue",
    },
  ]);

  const handleDelete = (studentNumber) => {
    alert("Transaction deleted", studentNumber);
  };

  const handleUpdate = (studentNumber) => {
    alert("Transaction updated", studentNumber);
  };

  const rowActions = (studentNumber) => [
    { label: "Update", onClick: () => handleUpdate(studentNumber) },
    { label: "Delete", onClick: () => handleDelete(studentNumber) },
  ];

  // Function to handle export action
  const handleExport = () => {
    alert("Succesfully exported as Spreadsheet...");
  };

  return (
    <div className="px-3">
      <div className="admin-table overflow-y-auto rounded-xl custom-scrollbar">
        <table className="bg-white w-full rounded-2xl px-2 py-2 shadow-xl">
          <thead className="sticky top-0 bg-white">
            <h2 className="text-xl text-black font-bold px-6 pt-6">
              Overdue Books
            </h2>
            <tr className="text-left text-black text-xl">
              <th colSpan="6" className="px-5 py-4 text-left"></th>
            </tr>
            <tr className="text-left text-black text-lg border-b border-gray">
              <th className="px-5 py-4">Student No.</th>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">DDC ID</th>
              <th className="px-5 py-4">Book Title</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {overdueBooks &&
              overdueBooks.map((book, index) => (
                <tr key={index} className="border-b border-gray text-sm">
                  <td className="px-5 py-2">{book.studentNumber}</td>
                  <td className="px-5 py-2">{book.name}</td>
                  <td className="px-5 py-2">{book.docId}</td>
                  <td className="px-5 py-2">{book.title}</td>
                  <td className="px-5 py-2">{book.status}</td>
                  <td className="px-5">
                    <Dropdown 
                      options={rowActions(book.studentNumber)}
                      onSelect={(option) => option.onClick(book.studentNumber)}
                      className="mr-2"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleExport}
        className="bg-maroon text-white text-sm py-2 px-4 flex items-center rounded-full absolute bottom-2 right-4 cursor-pointer">
        <BsFileEarmarkSpreadsheetFill className="mr-1" />
        Export as Spreadsheet
      </button>
    </div>
  );
};

export default OverdueTable;
