import React from "react";
import Greetings from "./Greetings";
import Transaction from "./Transaction";
 
const Dashboard = () => {
  return (
    <div className="h-screen flex-1">
      <Greetings></Greetings>
      <Transaction></Transaction>
    </div>
  );
};

export default Dashboard
