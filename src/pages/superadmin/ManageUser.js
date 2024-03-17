import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import Dropdown from "./Dropdown";
import supabase from "../../supabaseClient";

const UserListSuperAdmin = () => {
  // Modal start
  const [showModal, setShowModal] = useState(false);
  const [studentNumber, setStudentNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  // Update modal 
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateStudentNumber, setUpdateStudentNumber] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");
  const [updateFirstName, setUpdateFirstName] = useState("");
  const [updateMiddleName, setUpdateMiddleName] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateCourse, setUpdateCourse] = useState("");

  // Function to open update modal
  const handleOpenUpdateModal = (userData) => {
    setUpdateStudentNumber(userData.studentNo);
    setUpdateLastName(userData.lastName);
    setUpdateFirstName(userData.firstName);
    setUpdateMiddleName(userData.middleName);
    setUpdatePassword(userData.password);
    setUpdateEmail(userData.email);
    setUpdateCourse(userData.course);
    setShowUpdateModal(true);
  };

  // Function to close update modal
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // handle update
  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          lastName: updateLastName,
          firstName: updateFirstName,
          middleName: updateMiddleName,
          email: updateEmail,
          course: updateCourse,
          password: updatePassword
        })
        .eq('studentNo', updateStudentNumber);

      if (error) {
        alert("Error updating user: " + error.message);
      } else {
        alert("User updated successfully!");
        handleCloseUpdateModal();
        fetchData();
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      alert("Error updating user: " + error.message);
    }
  };

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

  // delete
  const handleDelete = async (studentNumber) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('studentNo', studentNumber);

      if (error) {
        alert("Error deleting user: " + error.message);
      } else {
        alert("User deleted successfully!");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      alert("Error deleting user: " + error.message);
    }
  };

  // handle create
  const handleCreateAccount = async () => {
    if (
      !studentNumber ||
      !lastName ||
      !firstName ||
      !middleName ||
      !email ||
      !course ||
      !password
    ) {
      alert("Please fill in all information.");
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .insert([
          {
            studentNo: studentNumber,
            lastName: lastName,
            firstName: firstName,
            middleName: middleName,
            email: email,
            course: course,
            password: password
          }
        ]);

      if (error) {
        alert("Error creating account: " + error.message);
      } else {
        alert("Account created successfully!");
        handleCloseModal();
        fetchData();
      }
    } catch (error) {
      console.error("Error creating account:", error.message);
      alert("Error creating account: " + error.message);
    }
  };

  const rowActions = (studentNo) => {
    return [
      {
        label: "Update",
        onClick: (studentNo) => handleOpenUpdateModal(studentNo),
      },
      {
        label: "Delete",
        onClick: (studentNo) => handleDelete(studentNo),
      },
    ];
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // course selection options
  const categories = ["All", "BSCS", "BSTM", "BSHM", "POLSCI", "BEED", "BSBA"];

  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const filteredData = userData.filter((item) =>
    selectedCategory === "All" || item.course === selectedCategory
      ? String(item.studentNo).includes(searchQuery) ||
        item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.middleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  // Function to handle export
  const handleExport = () => {
    alert("Successfully exported as Spreadsheet...");
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
          className="w-fit py-3 px-4 xl:ml-60 md:ml-32 bg-gray rounded-xl shadow-sm focus:outline-none focus:ring-maroon focus:border-maroon sm:text-sm category"
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
              <tr key={item.studentNo} className="border-b border-gray text-sm">
                <td className="px-5 py-2">{item.studentNo}</td>
                <td className="px-5 py-2">{item.lastName}</td>
                <td className="px-5 py-2">{item.firstName}</td>
                <td className="px-5 py-2">{item.middleName}</td>
                <td className="px-5 py-2">{item.course}</td>
                <td className="px-5 py-2">{item.email}</td>
                <td className="px-5">
                  <Dropdown
                    options={rowActions(item.studentNo)}
                    onSelect={(option) => option.onClick(item)}
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
            <h2 className="text-xl font-bold mb-4 text-center">Student Information</h2>
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
                <select
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
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
      {showUpdateModal && (
        <div
          className="fixed inset-0 z-10 flex justify-center items-center shadow-2xl"
          onClick={() => setShowUpdateModal(false)}
        >
          <div
            className="bg-peach p-4 rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Update Student Info</h2>
            <div className="grid grid-cols-2 gap-10 ">
              <div className="flex flex-col w-72">
                <label className="text-sm ml-1">Student number:</label>
                <input
                  type="number"
                  placeholder="Student Number"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={updateStudentNumber}
                  onChange={(e) => setUpdateStudentNumber(e.target.value)}
                />
                <label className="text-sm ml-1">Lastname:</label>
                <input
                  type="text"
                  placeholder="Lastname"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={updateLastName}
                  onChange={(e) => setUpdateLastName(e.target.value)}
                />
                <label className="text-sm ml-1">Firstname:</label>
                <input
                  type="text"
                  placeholder="Firstname"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={updateFirstName}
                  onChange={(e) => setUpdateFirstName(e.target.value)}
                />
                <label className="text-sm ml-1">Middlename:</label>
                <input
                  type="text"
                  placeholder="Middlename"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={updateMiddleName}
                  onChange={(e) => setUpdateMiddleName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-72">
                <label className="text-sm ml-1">Password:</label>
                <input
                  type="text"
                  placeholder="Password"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={updatePassword}
                  onChange={(e) => setUpdatePassword(e.target.value)}
                />
                <label className="text-sm ml-1">Email:</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={updateEmail}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                />
                <label className="text-sm ml-1">Course:</label>
                <select
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={updateCourse}
                  onChange={(e) => setUpdateCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <button
                className="bg-maroon text-white py-2 px-4 rounded-lg mr-2"
                onClick={handleUpdate}
              >
                Update account
              </button>
              <button
                className="bg-gray text-white py-2 px-4 rounded-lg"
                onClick={handleCloseUpdateModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleExport}
        className="bg-maroon text-white text-sm py-2 px-4 flex items-center rounded-full absolute bottom-2 right-4 cursor-pointer"
      >
        <BsFileEarmarkSpreadsheetFill className="mr-1" />
        Export as Spreadsheet
      </button>
    </div>
  );
};

export default UserListSuperAdmin;
