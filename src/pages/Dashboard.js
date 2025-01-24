import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPrice, setHistoricalData } from "../redux/cryptoSlice";
import axios from "axios";
import CryptoChart from "../components/Chart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { selectedCrypto, historicalData } = useSelector(
    (state) => state.crypto
  );
  const fetchData = async () => {
    const priceRes = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto}&vs_currencies=usd`
    );
    dispatch(setCurrentPrice(priceRes.data[selectedCrypto]));

    const historicalRes = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart?vs_currency=usd&days=7`
    );
    dispatch(
      setHistoricalData(
        historicalRes.data.prices.map(([date, price]) => ({
          date: new Date(date).toLocaleDateString(),
          price,
        }))
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, [selectedCrypto, dispatch]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${selectedCrypto}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data[selectedCrypto]) {
        dispatch(
          setCurrentPrice({
            price: data[selectedCrypto],
          })
        );
      }
    };
  }, [dispatch, selectedCrypto]);

  const currentPrice = useSelector((state) => state.crypto.currentPrice);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-blue-600 text-center mb-8">
        Dashboard
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-700">Current Price:</h3>
        <p className="text-3xl font-bold text-green-600">
          ${currentPrice?.price}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Price History
        </h3>
        <CryptoChart data={historicalData} />
      </div>
    </div>
  );
};

export default Dashboard;
