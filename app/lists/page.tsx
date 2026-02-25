"use client";

import { useEffect, useState } from "react";

export default function ListsPage() {
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedCompanies") || "[]");
    setCompanies(stored);
  }, []);

  function remove(id: string) {
    const updated = companies.filter((c) => c.id !== id);
    localStorage.setItem("savedCompanies", JSON.stringify(updated));
    setCompanies(updated);
  }

  function exportCSV() {
    const stored = JSON.parse(localStorage.getItem("savedCompanies") || "[]");

    if (!stored.length) {
      alert("No companies to export");
      return;
    }

    const headers = ["ID", "Name", "Sector", "Location"];
    const rows = stored.map((c: any) => [
      c.id,
      c.name,
      c.sector,
      c.location,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
       .map((row) => row.map((x: string | number) => `"${x}"`).join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "saved_companies.csv");
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div className="p-10 max-w-3xl">

      {/* Header + Export Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Saved Companies</h1>

        <button
          onClick={exportCSV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {companies.length === 0 && (
      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400">
  No saved companies yet. Save from Companies page.
</div>
      )}

      {companies.map((company) => (
        <div
          key={company.id}
          className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm mb-3 flex justify-between"
        >
          <span className="font-medium">{company.name}</span>

          <button
            onClick={() => remove(company.id)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}