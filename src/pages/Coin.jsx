import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../context/CoinContext';
import LineChart from "../components/LineChart"
import '../pages/Coin.css'
const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();

  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  };
 
 const fetchHistoricalData=async()=>{
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  const Url = import.meta.env.VITE_API_URL;
  
fetch(`${Url}/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .then(response => setHistoricalData(response))
  .catch(err => console.error(err));
   }

  useEffect(() => {
    fetchHistoricalData();
    fetchCoinData();
  }, [currency, coinId]); // Added coinId to the dependency array

 if(coinData){
  return (
    <div className='coin py-0 px-5'>
      <div className="coin-name flex flex-col items-center gap-5 m-auto-[100px] mb-12">
        <img src={coinData.image.large} alt={coinData.name} className='max-w-[100px]'/>
        <p className=" text-[30px] font-medium ">{coinData.name} ({coinData.symbol.toUpperCase()})</p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>

      <div className="coin-info max-w-[600px] my-[50px] mx-auto flex-col">
        <ul>
          <li>crypto market Rank</li>
          <li>{coinData.market_cap_rank}</li>          
          </ul>
          <ul>
          <li> Current price</li>
          <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>          
          </ul>
          <ul>
          <li> Market cap</li>
          <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>          
          </ul>
          <ul>
          <li> 24 Hour High </li>
          <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>          
          </ul>
          <ul>
          <li> 24 Hour Low</li>
          <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>          
          </ul>
      </div>
    </div>
  );
 }else {
  return (
    <div className="loading">
      <p>Data is loading ...</p>
    </div>
  );
}
};

export default Coin;
