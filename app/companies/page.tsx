"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { companies } from "../../data/companies";

export default function CompaniesPage({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const initialSearch = searchParams?.search || "";

  const [search, setSearch] = useState(initialSearch);
  const [sector, setSector] = useState("All");
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);

  const perPage = 3;

  const filtered = useMemo(() => {
    let result = companies.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sector !== "All") {
      result = result.filter((c) => c.sector === sector);
    }

    if (location !== "All") {
      result = result.filter((c) => c.location === location);
    }

    result.sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return result;
  }, [search, sector, location, sort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Companies</h1>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="border p-2 rounded"
          value={sector}
          onChange={(e) => {
            setPage(1);
            setSector(e.target.value);
          }}
        >
          <option>All</option>
          <option>Fintech</option>
          <option>SaaS</option>
          <option>Productivity</option>
        </select>

        <select
          className="border p-2 rounded"
          value={location}
          onChange={(e) => {
            setPage(1);
            setLocation(e.target.value);
          }}
        >
          <option>All</option>
          <option>USA</option>
          <option>India</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="asc">Sort A → Z</option>
          <option value="desc">Sort Z → A</option>
        </select>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {paginated.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${company.id}`}
            className="block border rounded p-4 bg-white hover:shadow"
          >
            <div className="font-semibold">{company.name}</div>
            <div className="text-sm text-gray-500">
              {company.sector} • {company.location}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded border ${
              p === page ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}