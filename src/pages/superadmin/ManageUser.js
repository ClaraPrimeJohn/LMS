import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import Dropdown from "./Dropdown";

const UserListSuperAdmin = () => {
  //Modal start
  const [showModal, setShowModal] = useState(false);
  const [studentNumber, setStudentNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    setStudentNumber("");
    setLastName("");
    setFirstName("");
    setMiddleName("");
    setPassword("");
    setEmail("");
    setCourse("");
  };

  const handleCreateAccount = () => {
    alert("Oke na...");
    handleCloseModal();
  };
  //Modal end

  //Dropdown category and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  //Category data
  const categories = ["All", "BSCS", "BSTM", "BSHM", "POLSCI", "BEED", "BSBA"];

  //Sample data
  const userList = [
    {
      studentNumber: 20226535,
      lastname: "Pacatang",
      firstname: "John Paul",
      middlename: "Boado",
      course: "BSCS",
      email: "johnpaulpacatang.scc@gmail.com",
    },
    {
      studentNumber: 20226869,
      lastname: "Tresmanio",
      firstname: "Ryan",
      middlename: "Tuazon",
      course: "BSCS",
      email: "tresmanioryan.scc@gmail.com",
    },
    {
      studentNumber: 20225301,
      lastname: "Clara",
      firstname: "Prime John",
      middlename: "Frago",
      course: "BSCS",
      email: "primejohnclara.scc@gmail.com",
    },
    {
      studentNumber: 20227468,
      lastname: "Mantes",
      firstname: "Reynold",
      middlename: "Villalva",
      course: "BSCS",
      email: "reynoldmantes.scc@gmail.com",
    },
    {
      studentNumber: 20220000,
      lastname: "Yunting",
      firstname: "Joannes Paulus",
      middlename: "Magan",
      course: "BSCS",
      email: "joannespaulusyunting.scc@gmail.com",
    },
  ];

  //Dropdown category and search
  const filteredData = userList.filter((item) =>
    selectedCategory === 'All' || item.course === selectedCategory
      ? String(item.studentNumber).includes(searchQuery) ||
        item.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.middlename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );
  
  const handleDelete = (studentNumber) => {
    alert("Delete user", studentNumber);
  };

  const handleUpdate = (studentNumber) => {
    alert("Update user", studentNumber);
  };

  const rowActions = (studentNumber) => [
    { label: "Update", onClick: () => handleUpdate(studentNumber)},
    { label: "Delete", onClick: () => handleDelete(studentNumber)},
  ];
  
  const handleExport = () => {
    alert('Succesfully exported as Spreadsheet...');
  };

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
          <thead className="sticky top-0 bg-white">
            <tr className="pb-2">
              <th colSpan="10">
                <div className="flex justify-between items-center px-5 py-4">
                  <h2 className="text-xl text-black">Users list</h2>
                  <button
                    className="bg-white text-black border rounded-xl p-3 hover:bg-maroon hover:text-white"
                    onClick={handleOpenModal}
                  >
                    Add User
                  </button>
                </div>
              </th>
            </tr>

            <tr className="text-left text-black text-lg border-b border-gray">
              <th className="px-5 py-4">Student No.</th>
              <th className="px-5 py-4">Lastname</th>
              <th className="px-5 py-4">Firstname</th>
              <th className="px-5 py-4">Middlename</th>
              <th className="px-5 py-4">Course</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.studentNumber} className="border-b border-gray text-sm">
                <td className="px-5 py-2">{item.studentNumber}</td>
                <td className="px-5 py-2">{item.lastname}</td>
                <td className="px-5 py-2">{item.firstname}</td>
                <td className="px-5 py-2">{item.middlename}</td>
                <td className="px-5 py-2">{item.course}</td>
                <td className="px-5 py-2">{item.email}</td>
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
            className="bg-peach p-4 rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Student Information
            </h2>

            <div className="grid grid-cols-2 gap-10 ">
              <div className="flex flex-col w-72">
                <label className="text-sm ml-1">Student number:</label>
                <input
                  type="number"
                  placeholder="Student Number"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                />

                <label className="text-sm ml-1">Lastname:</label>
                <input
                  type="text"
                  placeholder="Lastname"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <label className="text-sm ml-1">Firstname:</label>
                <input
                  type="text"
                  placeholder="Firstname"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="text-sm ml-1">Middlename:</label>
                <input
                  type="text"
                  placeholder="Middlename"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-72">
                <label className="text-sm ml-1">Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label className="text-sm ml-1">Email:</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="text-sm ml-1">Course:</label>
                <input
                  type="text"
                  placeholder="Course"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                className="bg-maroon text-white py-2 px-4 rounded-lg mr-2"
                onClick={handleCreateAccount}
              >
                Create account
              </button>
            </div>

          </div>
        </div>
        
      )}
      <button
        onClick={handleExport}
        className='bg-maroon text-white text-sm py-2 px-4 flex items-center rounded-full absolute bottom-2 right-4 cursor-pointer'>
        <BsFileEarmarkSpreadsheetFill className="mr-1" />Export as Spreadsheet
      </button>
    </div>
  );
};

export default UserListSuperAdmin;
