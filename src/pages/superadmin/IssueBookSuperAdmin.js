import React, { useState } from 'react';
import Issue from './Issue';
import OverdueTable from './OverdueTable'; 
import { BiSearch } from 'react-icons/bi';

const IssueBook = () => {
  const [selectedCategory, setSelectedCategory] = useState('Issue');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className='flex-1'>
      <div className="flex items-center justify-center w-full px-3">
        <div className="bg-white my-3 px-2 py-2 rounded-xl shadow-lg flex items-center w-full">
          <div className="flex items-center flex-grow">
            <BiSearch className="text-3xl mx-2 my-2 sm:text-4xl" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 border border-opacity-25 rounded-3xl focus:outline-none focus:ring-1"
            />
          </div>
          <select
            id="category"
            name="category"
            className="w-fit py-3 px-4 xl:ml-60 md:ml-32 bg-gray rounded-xl shadow-sm focus:outline-none focus:ring-maroon focus:border-maroon sm:text-sm"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="Issue">Issue</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>
      {selectedCategory === 'Issue' ? (
        <Issue />
      ) : (
        <OverdueTable />
      )}
    </div>
  );
};

export default IssueBook;
