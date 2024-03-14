import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import Greetings from "./Greetings";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SA_Dashboard = () => {
  const [newUsers] = useState(100);
  const [topPick] = useState(500);
  const [borrowed] = useState(50);
  const [overdue] = useState(50);
  const options = {
    height: 400,
    axisY: {
      maximum: 30,
    },

    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Monday", y: 10, color: "maroon" },
          { label: "Tuesday", y: 15, color: "maroon" },
          { label: "Wednesday", y: 15, color: "maroon" },
          { label: "Thursday", y: 10, color: "maroon" },
          { label: "Friday", y: 10, color: "maroon" },
          { label: "Saturday", y: 3, color: "maroon" },
        ],
      },
    ],
  };

  return (
    <div className="statistics-section flex-1">
      <Greetings></Greetings>
      <div className="flex justify-between mt-10 mb-10 gap-5">
        <div className="p-12 h-60 w-full bg-white mx-3 rounded-xl shadow-xl">
          <p className="text-4xl text-center mt-5 font-bold">{newUsers}</p>
          <p className="center text-lg font-bold text-center my-3">New Users</p>
        </div>

        <div className="p-12 h-60 w-full bg-white mr-3 rounded-xl shadow-lg">
          <p className="text-4xl text-center mt-5 font-bold">{topPick}</p>
          <p className="center text-lg font-bold text-center my-3">
            Top Picked Book
          </p>
        </div>

        <div className="p-12 h-60 w-full bg-white mr-3 rounded-xl shadow-lg">
          <p className="text-4xl text-center mt-5 font-bold">{borrowed}</p>
          <p className="center text-lg font-bold text-center my-3">
            Borrowed Books
          </p>
        </div>

        <div className="p-12 h-60 w-full bg-white mr-3 rounded-xl shadow-lg">
          <p className="text-4xl text-center mt-5 font-bold">{overdue}</p>
          <p className="center text-lg font-bold text-center my-3">
            Overdue Books
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="h-auto w-full bg-white mx-3 p-5 mt-5 rounded-xl shadow-lg">
          <p className="center text-lg font-bold text-center my-3">
            New Users per Day
          </p>
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
        </div>

        <div className="bg-white mx-3 w-1/2 mt-5 rounded-xl shadow-xl flex flex-col">
          <p className="text-xl font-bold text-center mt-10">Top Borrower</p>
          <div className="p-10">
            <p className="mt-5 p-3 w-full bg-maroon rounded-md text-white flex justify-between">
              1. Full Name: <span>10 Books</span>
            </p>

            <p className="mt-5 p-3 w-full bg-maroon rounded-md text-white flex justify-between">
              2. Full Name: <span>7 Books</span>
            </p>

            <p className="mt-5 p-3 w-full bg-maroon rounded-md text-white flex justify-between">
              3. Full Name: <span>5 Books</span>
            </p>

            <p className="mt-5 p-3 w-full bg-maroon rounded-md text-white flex justify-between">
              4. Full Name: <span>4 Books</span>
            </p>

            <p className="mt-5 p-3 w-full bg-maroon rounded-md text-white flex justify-between">
              5. Full Name: <span>2 Books</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SA_Dashboard;
