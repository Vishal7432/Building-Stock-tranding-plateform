import React, { useState, useEffect } from "react";

import axios from "axios";
import VerticalGraph from "./VerticalGraph";
import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/allHoldings")
      .then((res) => {
        console.log(res.data);
        setAllHoldings(res.data || []);
      })
      .catch((err) => {
        // Show network/CORS errors in console and keep UI stable
        console.error("Error fetching holdings:", err);
        setAllHoldings([]);
      });
  }, []);

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </tbody>

          {allHoldings.map((stock, index) => {
            // Defensive conversion in case backend returns missing/undefined fields
            const qty = Number(stock.qty || 0);
            const avg = Number(stock.avg || 0);
            const price = Number(stock.price || 0);
            const curValue = price * qty;
            const isProfit = curValue - avg * qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{qty}</td>
                <td>{Number(avg).toFixed(2)}</td>
                <td>{Number(price).toFixed(2)}</td>
                <td>{Number(curValue).toFixed(2)}</td>
                <td className={profClass}>
                  {Number(curValue - avg * qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net ?? "-"}</td>
                <td className={dayClass}>{stock.day ?? "-"}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
