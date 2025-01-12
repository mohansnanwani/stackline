import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store.ts';
import './Graph.css'; 

const Graph: React.FC = () => {
  const salesData = useSelector((state: RootState) => state.sales.salesData);
  const [graphData, setGraphData] = useState<any[]>([]);

  useEffect(() => {
    // I am aggregating the sales 
    const monthlyData: { [key: string]: { retailSales: number, wholesaleSales: number, count: number } } = {};

    // I am retrieving month string off the dataset
    salesData.forEach((data) => {
      const month = new Date(data.weekEnding).toLocaleString('default', { month: 'long' }); 

      if (!monthlyData[month]) {
        monthlyData[month] = { retailSales: 0, wholesaleSales: 0, count: 0 };
      }

      monthlyData[month].retailSales += data.retailSales;
      monthlyData[month].wholesaleSales += data.wholesaleSales;
      monthlyData[month].count += 1;
    });

   
    const formattedData = Object.keys(monthlyData).map((month) => ({
      month,
      retailSales: monthlyData[month].retailSales / monthlyData[month].count, // Avg per month
      wholesaleSales: monthlyData[month].wholesaleSales / monthlyData[month].count, // Avg per month
    }));

    
    const sortedData = formattedData.sort((a, b) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

    // Displaying in format Jan, Feb, and so on
    const finalData = sortedData.map((data) => {
      const monthAbbr = data.month.substring(0, 3); 
      return { ...data, month: monthAbbr };
    });

    setGraphData(finalData);
  }, [salesData]);

  return (
    <div className="graph-container">
        <h4 style={{ textAlign : 'left', color: 'gray' }}>Retail Sales</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={graphData}>
          <CartesianGrid stroke= "none" />
          <XAxis dataKey="month" axisLine={false}/>
          <YAxis axisLine={false} tick={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="retailSales" stroke="#3aa3f5" strokeWidth={2} />
          <Line type="monotone" dataKey="wholesaleSales" stroke="#9da8c1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;