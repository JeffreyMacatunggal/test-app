"use client"

import axios from 'axios';
import { useState, useEffect } from 'react';
import Chart from "chart.js";



export default function Home() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetch_data = () => {
      axios.get('http://localhost:3000/api/core-stock/intraday')
        .then(function (response) {
          setDataList(response.data.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    
    fetch_data();

  }, []);

  console.log(dataList)

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div className="relative overflow-x-auto">
        <h1 className='text-4xl font-bold p-4'>Core Stock</h1>


      <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
            </li>
          </ul>
      </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Timestamp
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Open
                      </th>
                      <th scope="col" className="px-6 py-3">
                          High
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Low
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Close
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Volume
                      </th>
                  </tr>
              </thead>
              <tbody>
                {!isLoading &&
                
                  Object.entries(dataList).map((value, index) => {
                  
                  const timestamp = value[0]
                  const open = value[1]["1. open"]
                  const high = value[1]["2. high"]
                  const low = value[1]["3. low"]
                  const close = value[1]["4. close"]
                  const volume = value[1]["5. volume"]

                  return (<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {timestamp}
                            </th>
                            <td className="px-6 py-4">
                              {open}
                            </td>
                            <td className="px-6 py-4">
                              {high}
                            </td>
                            <td className="px-6 py-4">
                              {low}
                            </td>
                            <td className="px-6 py-4">
                              {close}
                            </td>
                            <td className="px-6 py-4">
                                {volume}
                            </td>
                        </tr> 
                      )
                  })
                }
              </tbody>
          </table>
      </div>

    </main>
  )
}
