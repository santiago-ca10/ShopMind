import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SalesChart({ data }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl mt-6">

      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Ventas
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#4f46e5"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SalesChart;
