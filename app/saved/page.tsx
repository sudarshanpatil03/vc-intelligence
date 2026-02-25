"use client";

import { useEffect, useState } from "react";

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  // Load saved searches
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedSearches") || "[]");
    setSearches(stored);
  }, []);

  function saveSearch() {
    if (!query.trim()) return;

    const updated = [query, ...searches.filter((s) => s !== query)];
    localStorage.setItem("savedSearches", JSON.stringify(updated));
    setSearches(updated);
    setQuery("");
  }

  function removeSearch(index: number) {
    const updated = searches.filter((_, i) => i !== index);
    localStorage.setItem("savedSearches", JSON.stringify(updated));
    setSearches(updated);
  }

  function runSearch(q: string) {
    // Redirect to companies page with query
    window.location.href = `/companies?search=${encodeURIComponent(q)}`;
  }

  return (
    <div className="p-10 max-w-3xl">

      <h1 className="text-2xl font-bold mb-6">Saved Searches</h1>

      {/* Search input */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-full"
          placeholder="Enter search term..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={saveSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {searches.length === 0 && (
        <p className="text-gray-500">No saved searches yet.</p>
      )}

      {searches.map((s, i) => (
        <div
          key={i}
          className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm mb-3 flex justify-between items-center"
        >
          <span className="font-medium">{s}</span>

          <div className="flex gap-3">
            <button
              onClick={() => runSearch(s)}
              className="text-blue-600 hover:underline"
            >
              Run
            </button>

            <button
              onClick={() => removeSearch(i)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}