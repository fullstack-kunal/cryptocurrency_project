import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const History = () => {
  const { historicalData , volumeData} = useSelector((state) => state.crypto);
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const filteredData = historicalData.filter((data) => {
    const matchesSearch = data.date.includes(search) || data.price.toString().includes(search);
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'high') return matchesSearch && data.price > 50000;
    if (filterBy === 'low') return matchesSearch && data.price <= 50000;
    return matchesSearch;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Cryptocurrency Price History</h2>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by date or price..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Prices</option>
          <option value="high">Above $50,000</option>
          <option value="low">Below $50,000</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Price (USD)</th>
              <th className="px-4 py-2 text-left">24-Hour Volume</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="px-4 py-2">{data.date}</td>
                  <td className="px-4 py-2 text-green-600 font-semibold">${data.price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-orange-500 font-medium">
                    {data.volume ? `$${data.volume.toLocaleString()}` : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No matching data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
