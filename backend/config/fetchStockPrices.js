
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
        "x-rapidapi-key": "293db707d2msh3b8c351d3e22470p1f39eajsn5f72855ed56b",
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

