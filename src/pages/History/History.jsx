import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const History = () => {
  const loader = useLoaderData();
  const { incomes, expenses } = loader;

  // Filter uchun holat
  const [filter, setFilter] = useState("all");

  // Barcha elementlarni birlashtirish
  const allEntries = [...incomes, ...expenses];

  // Filter asosida ma'lumotlarni filtrlash
  const filterEntries = (entries) => {
    const now = new Date();
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (filter === "1week") {
        return now - entryDate <= 7 * 24 * 60 * 60 * 1000; // 1 hafta
      } else if (filter === "1month") {
        return now - entryDate <= 30 * 24 * 60 * 60 * 1000; // 1 oy
      } else if (filter === "1year") {
        return now - entryDate <= 365 * 24 * 60 * 60 * 1000; // 1 yil
      }
      return true; // "all" tanlanganda barcha ma'lumotlarni qaytaradi
    });
  };

  const filteredEntries = filterEntries(allEntries);

  // Tartiblash: vaqt bo‘yicha
  const sortedEntries = filteredEntries.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // So'nggi sana yuqorida bo'lishi uchun
  });

  // Sana formatlash
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month} ${day}, ${year} ${hours}:${minutes}`;
  };

  // Balansni hisoblash
  const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
  const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">History</h1>

      {/* Filter tugmalari */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          All Time
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "1week" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("1week")}
        >
          Last 1 Week
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "1month" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("1month")}
        >
          Last 1 Month
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "1year" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("1year")}
        >
          Last 1 Year
        </button>
      </div>

      {/* Balans, Total Income va Total Expenses */}
      <div className="flex justify-center items-center mb-6 space-x-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Total Income</h2>
          <p className="text-2xl text-green-500">+${totalIncome.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Total Balance</h2>
          <p className={`text-2xl font-bold ${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Total Expenses</h2>
          <p className="text-2xl text-red-500">-${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      {/* History List */}
      {sortedEntries.length > 0 ? (
        <ul className="space-y-4">
          {sortedEntries.map((entry, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg shadow-md ${
                entry.type === "expense" ? "bg-red-200" : "bg-green-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-lg text-gray-800">
                    {entry.type.toUpperCase()}
                  </span>
                  <div className="text-gray-600">
                    ${entry.amount} - {formatDate(entry.date)}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">{entry.category}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No history available.</p>
      )}
    </div>
  );
};

export default History;
