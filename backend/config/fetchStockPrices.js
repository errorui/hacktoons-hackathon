
import axios from "axios";

export const getStockPrice = async (symbol) => {

    const options = {
      method: 'GET',
      url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history',
      params: {
        symbol: symbol,
        interval: '5m',
        diffandsplits: 'false'
      },
      headers: {
        'x-rapidapi-key': 'd3e92ae6d0msh46e3c2c20d23d24p15d981jsn32156835c781',
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      const data = response.data; // Axios already parses JSON for you
   
  
      return data?.meta?.regularMarketPrice;
   
    } catch (error) {
        throw error;
    }
};

