import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/ChartHelpers";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("transactions", transactions);
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-1">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button
          className="add-btn cursor-pointer"
          onClick={onAddIncome}
        >
          <Plus size={15} className="text-lg" /> Add Income
        </button>
      </div>

      {/* Chart */}
      <div className="w-full mt-4 h-72">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
