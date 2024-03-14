import React, { useState, useEffect } from "react";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";

const LibraryLogs = () => {
  const [showModal, setShowModal] = useState(false);
  const [studentNumber, setStudentNumber] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [userList, setUserList] = useState([]);
  const [username] = useState("Admin");

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = currentTime.getHours();

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getGreeting = () => {
    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStudentNumber("");
    setName("");
    setCourse("");
  };

  const handleSignIn = () => {
    const newUserList = [
      ...userList,
      {
        studentNumber: parseInt(studentNumber),
        name,
        course,
        date: currentTime.toLocaleDateString(),
        timeIn: formattedTime,
        timeOut: "",
        action: "Signed In",
      },
    ];
    setUserList(newUserList);
    handleCloseModal();
  };

  const handleSignOut = (studentNumber) => {
    const currentUserList = userList.map((user) => {
      if (user.studentNumber === studentNumber) {
        user.timeOut = new Date().toLocaleTimeString();
        user.action = "Signed Out";
      }
      return user;
    });
    setUserList(currentUserList);
  };

  const handleExport = () => {
    alert('Succesfully exported as Spreadsheet...');
  };

  return (
    <div className="px-3 flex-1 mt-3">
      <div className="p-4 bg-white rounded-lg shadow-lg mb-3">
        <div className="flex justify-between">
          <div className="Greetings">
            <p className="text-xl font-semibold pr-4">
              {getGreeting()},{" "}
              <span className="text-maroon">Welcome {username}!👋</span>
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold">
              {currentTime.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              |{" "}
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
              })}
              , {formattedTime}
            </p>
          </div>
        </div>
      </div>

      <div className="admin-table overflow-y-auto rounded-xl custom-scrollbar">        
        <table className="bg-white w-full rounded-2xl px-2 py-2 shadow-xl">
          <thead className="sticky top-0 bg-white">
            <tr className="pb-2">
              <th colSpan="10">
                <div className="flex justify-between items-center px-5 py-4">
                  <h2 className="text-xl text-black">Library Log</h2>
                  <button
                    className="bg-white text-black border rounded-xl p-3 hover:bg-maroon hover:text-white"
                    onClick={handleOpenModal}
                  >
                    Sign in
                  </button>
                </div>
              </th>
            </tr>

            <tr className="text-left text-black text-base border-b border-gray">
              <th className="px-5 py-4 w-1/6">Student No.</th>
              <th className="px-5 py-4 w-1/6">Name</th>
              <th className="px-5 py-4 w-1/6">Course</th>
              <th className="px-5 py-4 w-1/6">Date</th>
              <th className="px-5 py-4 w-1/6">Time In</th>
              <th className="px-5 py-4 w-1/6">Time Out</th>
              <th className="px-5 py-4 w-1/6">Action</th>
            </tr>
          </thead>

          <tbody>
            {userList.map((item) => {
              return (
                <tr
                  key={item.studentNumber}
                  className="text-sm border-b border-gray"
                >
                  <td className="px-4 py-1 w-1/6">{item.studentNumber}</td>
                  <td className="px-4 py-1 w-1/6">{item.name}</td>
                  <td className="px-4 py-1 w-1/6">{item.course}</td>
                  <td className="px-4 py-1 w-1/6">{item.date}</td>
                  <td className="px-4 py-1 w-1/6">{item.timeIn}</td>
                  <td className="px-4 py-1 w-1/6">{item.timeOut}</td>
                  <td
                    className={`px-4 py-1 w-1/6 ${
                      item.action === "Signed In" ? "text-green" : "text-red"
                    }`}
                  >
                    {item.action}
                  </td>
                  <td className="px-5 py-1 w-1/6">
                    <button
                      className={
                        item.action === "Signed In"
                          ? "bg-red text-white px-5 py-1 rounded-lg"
                          : "bg-green-600 text-white px-5 py-1 rounded-lg"
                      }
                      onClick={() => handleSignOut(item.studentNumber)}
                    >
                      {item.action === "Signed In" ? "Sign Out" : "Sign In"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-10 flex justify-center items-center shadow-2xl"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-peach p-12 rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              Student Information
            </h2>

            <div className="flex flex-col w-80">
              <div className="flex flex-col w-90">
                <label className="text-md">Student number</label>
                <input
                  type="number"
                  placeholder="Student Number"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-5 w-full"
                  value={studentNumber}
                  required
                  onChange={(e) => setStudentNumber(e.target.value)}
                />

                <label className="text-md ">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                
                />
                <label className="text-md">Course</label>
                <input
                  type="text"
                  placeholder="Course"
                  className="shadow-lg rounded-xl text-sm px-5 py-4 mb-4 w-full"
                  value={course}
                  required
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                className="bg-maroon text-white py-2 px-4 rounded-lg mr-2"
                onClick={handleSignIn}
              >
                Sign in
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

export default LibraryLogs;
