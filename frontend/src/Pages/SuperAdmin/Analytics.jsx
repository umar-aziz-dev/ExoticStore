import { fetchAvailableProduct, fetchSoldProduct } from "@/Store/SuperSlice/ProductSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export const Analytics = () => {
  const dispatch = useDispatch();

  const { availableProducts, soldProducts, isLoading } = useSelector(
    (state) => state.SuperProduct
  );

  // ================= FETCH DATA =================
  useEffect(() => {
    dispatch(fetchAvailableProduct());
    dispatch(fetchSoldProduct());
  }, [dispatch]);

  // ================= GROUP DATA BY MONTH =================
  const chartData = (() => {
    const monthlyMap = {};

    soldProducts.forEach((item) => {
      const month = new Date(item.createdAt).toLocaleString("default", {
        month: "short",
      });

      const sale = Number(item.saleprice) || 0;
      const purchase = Number(item.purchasedprice) || 0;
      const profit = sale - purchase;

      if (!monthlyMap[month]) {
        monthlyMap[month] = {
          month,
          sales: 0,
          profit: 0,
          sold: 0,
          available: 0,
        };
      }

      monthlyMap[month].sales += sale;
      monthlyMap[month].profit += profit;
      monthlyMap[month].sold += 1;
      monthlyMap[month].available = availableProducts.length;
    });

    // sort months properly
    return Object.values(monthlyMap).sort(
      (a, b) =>
        new Date(`1 ${a.month} 2024`) - new Date(`1 ${b.month} 2024`)
    );
  })();

  // ================= TOTAL STATS =================
  const totalProfit = soldProducts.reduce((acc, item) => {
    const sale = Number(item.saleprice) || 0;
    const purchase = Number(item.purchasedprice) || 0;
    return acc + (sale - purchase);
  }, 0);

  const totalSales = soldProducts.reduce(
    (acc, item) => acc + (Number(item.saleprice) || 0),
    0
  );

  const totalSold = soldProducts.length;
  const totalAvailable = availableProducts.length;

  // ================= UI =================
  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-semibold text-red-900 text-center">
        Analytics Dashboard
      </h1>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Total Profit</p>
          <h2 className="text-xl font-bold text-green-600">
            {totalProfit} Pkr
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Total Sales</p>
          <h2 className="text-xl font-bold text-red-900">
            {totalSales} Pkr
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Sold Accounts</p>
          <h2 className="text-xl font-bold text-red-700">
            {totalSold}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Available Accounts</p>
          <h2 className="text-xl font-bold text-green-600">
            {totalAvailable}
          </h2>
        </div>

      </div>

      {/* ===== LINE CHART ===== */}
      <div className="w-full h-80 bg-white shadow-md rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2 text-red-900">
          Monthly Sales & Profit
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#7f1d1d"
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="profit"
              stroke="#f59e0b"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ===== BAR CHART ===== */}
      <div className="w-full h-80 bg-white shadow-md rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2 text-red-900">
          Accounts Status
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="sold" fill="#7f1d1d" />
            <Bar dataKey="available" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LOADING */}
      {isLoading && (
        <p className="text-center text-gray-500">Loading analytics...</p>
      )}

    </div>
  );
};