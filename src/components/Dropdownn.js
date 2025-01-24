import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedCrypto } from "../redux/cryptoSlice";

const Dropdown = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSelectedCrypto(e.target.value));
  };

  return (
    <select
      onChange={handleChange}
      className="bg-white text-black px-2 py-1 rounded"
    >
      <option value="bitcoin">Bitcoin</option>
      <option value="ethereum">Ethereum</option>
      <option value="cardano">Cardano</option>
      <option value="tron">TRON</option>
      <option value="dogecoin">Dogecoin</option>
      <option value="ripple">Ripple</option>
      <option value="solana">Solana</option>
      <option value="binance">Binance</option>
      <option value="polygon">Polygon</option>
    </select>
  );
};

export default Dropdown;
