import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Cards";
import Button from "../components/ui/Button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", payments: 40 },
  { name: "Feb", payments: 30 },
  { name: "Mar", payments: 60 },
  { name: "Apr", payments: 50 },
  { name: "May", payments: 80 },
  { name: "Jun", payments: 70 },
];

const transactions = [
  { id: 1, student: "Ali Khan", school: "Springfield High", amount: "$200", status: "Completed" },
  { id: 2, student: "Sara Ahmed", school: "Greenwood School", amount: "$150", status: "Pending" },
  { id: 3, student: "John Doe", school: "Central Academy", amount: "$300", status: "Failed" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Data Visualization */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Live: Transaction Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#374151" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="payments" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Transactions Table */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2">Student</th>
                  <th className="px-4 py-2">School</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="px-4 py-2">{t.student}</td>
                    <td className="px-4 py-2">{t.school}</td>
                    <td className="px-4 py-2">{t.amount}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          t.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : t.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
