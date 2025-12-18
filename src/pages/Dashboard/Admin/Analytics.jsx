import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "../../../api/axios";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/analytics/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full p-4 flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="w-full p-4">
        <h2 className="text-3xl font-bold mb-6">Analytics</h2>
        <p>Failed to load analytics data.</p>
      </div>
    );
  }

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6">Analytics Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{stats.totals.users}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Scholarships</div>
          <div className="stat-value text-secondary">
            {stats.totals.scholarships}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Applications</div>
          <div className="stat-value text-accent">
            {stats.totals.applications}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Fees Collected</div>
          <div className="stat-value text-success">
            ${stats.totals.totalFeesCollected || 0}
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Applications by Category */}
        <div className="w-full lg:w-1/2 bg-base-200 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-center">
            Applications by Category
          </h3>
          {stats.applicationsByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.applicationsByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center">No application data available</p>
          )}
        </div>

        {/* Scholarships by Category */}
        <div className="w-full lg:w-1/2 bg-base-200 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-center">
            Scholarships by Category
          </h3>
          {stats.scholarshipsByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.scholarshipsByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {stats.scholarshipsByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center">No scholarship data available</p>
          )}
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Applications by Status */}
        <div className="w-full lg:w-1/2 bg-base-200 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-center">
            Applications by Status
          </h3>
          {stats.applicationsByStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.applicationsByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center">No status data available</p>
          )}
        </div>

        {/* Applications by University */}
        <div className="w-full lg:w-1/2 bg-base-200 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-center">
            Top 10 Universities by Applications
          </h3>
          {stats.applicationsByUniversity?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.applicationsByUniversity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center">No university data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
