"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Profile from "../../assets/profile.jpg";

const Setting = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [Password, setPassword] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    setCurrentPassword("");
    setNewPassword("");
    setPassword("");
  };

  const handleResetPassword = () => {
    console.log("Resetting password...");
    handleCloseModal();
  };

  const handleApplyButton = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Changes are saved!",
      showConfirmButton: false,
      timer: 1700,
    });
  };

  return (
    <div className="flex-1">
      <div className="flex justify-center items-center bg-white shadow-xl my-24 mx-3 rounded-xl h-3/4">
        <div className="m-auto p-10 mr-4">
          <ul className="list-unstyled">
            <li className="mb-2 flex flex-col items-center">
              <img src={Profile} alt="User profile" height={250} width={300} />
              <button className="text-white bg-maroon rounded-md px-4 py-1 hover:underline">
                Upload photo
              </button>
              <button
                className="text-blue-600 hover:underline mt-2"
                onClick={handleOpenModal}
              >
                Reset password
              </button>
            </li>
          </ul>
        </div>

        <div className="flex-grow pl-10 p-10">
          <h1 className="text-3xl mb-4 text-left pr-5 font-semibold">
            Student Information
          </h1>
          <div className="grid grid-cols-2 gap-8 place-content-evenly">
            <div className="mb-4">
              <label className="block text-black font-bold mb-2">
                First Name:
              </label>
              <p className="text-black bg-gray p-3 rounded-lg w-4/5">Juan</p>
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold mb-2">
                Middle Name:
              </label>
              <p className="text-black bg-gray p-3 rounded-lg w-4/5">Tamad</p>
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold mb-2">
                Last Name:
              </label>
              <p className="text-black bg-gray p-3 rounded-lg w-4/5">
                Dela Cruz
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold mb-2">Course:</label>
              <p className="text-black bg-gray p-3 rounded-lg w-4/5">BSTM</p>
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold mb-2">Email:</label>
              <p className="text-black bg-gray p-3 rounded-lg w-4/5">
                juandelacruz.scc@gmail.com
              </p>
            </div>
          </div>
          <div className="applyButton flex justify-end pr-10 mr-10">
            <button
              className="button-1 bg-blue-600 text-white py-2 px-4 rounded mr-2 bg-blue hover:bg-maroon active:bg-green"
              onClick={handleApplyButton}
            >
              Apply
            </button>
            <button className="button-2 bg-gray-300 text-gray-800 py-2 px-4 rounded border border-gray">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-peach p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Reset Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              className="rounded shadow-md px-3 py-2 mb-4 w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="rounded shadow-md px-3 py-2 mb-4 w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Re-type Password"
              className="rounded shadow-md px-3 py-2 mb-4 w-full"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              />

            <div className="flex justify-end">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded mr-2 bg-blue"
                onClick={handleResetPassword}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded bg-gray"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
