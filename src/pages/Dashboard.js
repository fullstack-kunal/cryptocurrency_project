import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPrice, setHistoricalData } from "../redux/cryptoSlice";
import axios from "axios";
import CryptoChart from "../components/Chart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { selectedCrypto, historicalData} = useSelector(
    (state) => state.crypto
  );
  console.log(selectedCrypto,'selectedCrypto')
  const fetchData = async () => {
    const priceRes = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto}&vs_currencies=usd`
    );
    dispatch(setCurrentPrice(priceRes.data[selectedCrypto]));

    const historicalRes = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart?vs_currency=usd&days=7`
    );
    dispatch(setHistoricalData(historicalRes.data.prices.map(([date, price]) => ({
          date: new Date(date).toLocaleDateString(),
          price,
        }))
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, [selectedCrypto, dispatch]);

  return (
    <div>
      <h2>Dashboard</h2>
      <CryptoChart data={historicalData} />
    </div>
  );
};

export default Dashboard;
