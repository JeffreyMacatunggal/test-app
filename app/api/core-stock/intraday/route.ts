import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { get } from 'http';
import { NextResponse } from 'next/server';

type TimeSeriesData = {
  [timestamp: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
  };
};

export const GET = async (req: Request, res: Response) => {
  try {
    const API_KEY = 'RIBXT3XYLI69PC0Q'; // limit only to 100 request
    const interval = 1
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=${interval}min&apikey=demo`;

    const response = await axios.get(apiUrl);
    
    const data: TimeSeriesData = response.data[`Time Series (${interval}min)`];

    return NextResponse.json({ message: "OK", data}, {status: 200});
    } catch (error) {
      return NextResponse.json({ error: 'An error occurred' }, {status: 400});
    }
  
};
