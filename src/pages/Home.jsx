import React, { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../context/CoinContext';
import {Link } from "react-router-dom"

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input ,setInput]=useState('');

const inputHandler=(e)=>{
  setInput(e.target.value);
  if(e.target.value===""){
    setDisplayCoin(allCoin);
  }

}
const searchHandler= (event)=>{
  event.preventDefault();
  const coins=allCoin.filter((item)=>{
     return item.name.toLowerCase().includes(input.toLowerCase())
  })
setDisplayCoin(coins)
}
  useEffect(() => {
    if (Array.isArray(allCoin)) {
      setDisplayCoin(allCoin);
    }
  }, [allCoin]);

  return (
    <>
      <div className="Home py-6 px-4 sm:px-6 lg:px-8">
        <div className="Hero max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Largest <br /> Crypto MarketPlace
          </h1>
          <p className="w-full sm:w-3/4 leading-relaxed text-lg">
            Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.
          </p>
          <form action="" onSubmit={searchHandler} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              onChange={inputHandler}
              value={input}
              placeholder="Search crypto..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-lg outline-none text-black"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white rounded-md px-6 py-2 font-semibold hover:bg-purple-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
        <div className="crypto-table max-w-4xl mx-auto mt-8 rounded-xl bg-custom-gradient">
          <div className="table-layout  grid grid-cols-5 text-white font-medium border-b border-white py-4 px-5">
            <p>#</p>
            <p className="col-span-2 sm:col-span-1">Coins</p>
            <p className="hidden sm:block">Price</p>
            <p className="text-center hidden sm:block">24Hrs Change</p>
            <p className="text-right hidden sm:block">Market Cap</p>
          </div>
          {displayCoin.length > 0 ? (
            displayCoin.slice(0, 21).map((item, index) => (
              <Link to={`/coin/${item.id}`} className="table-layout grid grid-cols-5 items-center py-4 px-5 text-black border-b border-gray-300 bg-custom-gradient " key={index}>
                <p>{item.market_cap_rank}</p>
                <div className="flex items-center col-span-2 sm:col-span-1">
                  <img src={item.image} alt={item.name} className="w-8 h-8 mr-3" />
                  <p>{item.name}</p>
                </div>
                <p className="hidden sm:block">{currency.symbol}{item.current_price}</p>
                <p className={`text-center hidden sm:block ${item.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p className="text-right hidden sm:block">{currency.symbol}{item.market_cap}</p>
              </Link>
            ))
          ) : (
            <div className="text-center py-4 text-white">No data available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
