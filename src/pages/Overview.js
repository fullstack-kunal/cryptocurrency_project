import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOverviewData } from '../redux/cryptoSlice';
import axios from 'axios';

const Overview = () => {
  const dispatch = useDispatch();
  const { selectedCrypto, overviewData, historicalData } = useSelector((state) => state.crypto);

  const [allTimeHigh, setAllTimeHigh] = useState(0);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCrypto}`);
        dispatch(setOverviewData(res.data));
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    fetchOverviewData();
  }, [selectedCrypto, dispatch]);

  useEffect(() => {
    if (Array.isArray(historicalData) && historicalData.length > 0) {
      try {
        const highestPrice = Math.max(...historicalData.map((data) => data.price));
        setAllTimeHigh(highestPrice);
      } catch (error) {
        console.error('Error processing historical data:', error);
      }
    } else {
      console.warn('Historical data is not an array or is empty.');
    }
  }, [historicalData]);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        {overviewData?.name || 'Cryptocurrency'} Overview
      </h2>

      <p className="text-gray-700 text-lg mb-6">
        {overviewData?.description?.en
          ? overviewData.description.en.split('.').slice(0, 2).join('.') + '.'
          : 'Description not available.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-blue-600 font-bold text-lg">Market Cap</h3>
          <p className="text-gray-700 text-xl font-semibold">
            ${overviewData?.market_data?.market_cap?.usd?.toLocaleString() || 'N/A'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-blue-600 font-bold text-lg">Total Supply</h3>
          <p className="text-gray-700 text-xl font-semibold">
            {overviewData?.market_data?.total_supply?.toLocaleString() || 'N/A'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-blue-600 font-bold text-lg">Circulating Supply</h3>
          <p className="text-gray-700 text-xl font-semibold">
            {overviewData?.market_data?.circulating_supply?.toLocaleString() || 'N/A'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-blue-600 font-bold text-lg">All-Time High</h3>
          <p className="text-gray-700 text-xl font-semibold">
            ${allTimeHigh ? allTimeHigh.toFixed(2) : 'N/A'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-blue-600 font-bold text-lg">Rank</h3>
          <p className="text-gray-700 text-xl font-semibold">
            #{overviewData?.market_cap_rank || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
