import React from "react";
import Books from "./Books";

const Transaction = () => {
  return (
    <div className="grid grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col">
        <Books />
        <div className="flex flex-col my-3">
          <h1 className="ml-3 mt-2 text-left text-xl font-bold">
            Notifications
          </h1>
          <ul className="custom-scrollbar overflow-y-auto notification-height">
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
            <li className="text-base ml-3 mt-4 text-black bg-white rounded-lg px-2 py-6 shadow-xl">
              <p>This is a Notification</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Right side */}
      <div className="mr-3 ml-12 mt-3 relative bg-white rounded-lg p-4 shadow-xl">
        <div className="flex flex-col">
          <p className="text-lg">Transaction History</p>
          <div className="transaction-list">
            <p className="text-black text-center py-80">Nothing to show</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
