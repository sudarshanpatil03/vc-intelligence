"use client";
import { companies } from "../../../data/companies";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function CompanyProfile() {
  const { id } = useParams();
  const company = companies.find((c) => c.id === id);

  const [notes, setNotes] = useState("");
  const [enrichment, setEnrichment] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load notes
  useEffect(() => {
    const saved = localStorage.getItem(`notes-${id}`);
    if (saved) setNotes(saved);
  }, [id]);

  function saveNotes(value: string) {
    setNotes(value);
    localStorage.setItem(`notes-${id}`, value);
  }

  function saveToList() {
    const existing = JSON.parse(localStorage.getItem("savedCompanies") || "[]");
    if (!existing.find((c: any) => c.id === company?.id)) {
      localStorage.setItem("savedCompanies", JSON.stringify([...existing, company]));
      alert("Saved to list");
    } else {
      alert("Already saved");
    }
  }

  async function enrich() {
    setLoading(true);
    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        body: JSON.stringify({ domain: company?.domain }),
      });

      const data = await res.json();
      setEnrichment(data);

      // Cache
      localStorage.setItem(`enrich-${id}`, JSON.stringify(data));
    } catch {
      alert("Enrichment failed");
    }
    setLoading(false);
  }

  // Load cached enrichment
  useEffect(() => {
    const cached = localStorage.getItem(`enrich-${id}`);
    if (cached) setEnrichment(JSON.parse(cached));
  }, [id]);

  if (!company) return <div className="p-10">Company not found</div>;

  return (
    <div className="p-10 max-w-3xl">

      <h1 className="text-2xl font-bold mb-2">{company.name}</h1>
      <p className="text-gray-500 mb-6">
        {company.sector} • {company.location}
      </p>

      {/* Save Button */}
      <button
        onClick={saveToList}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Save to List
      </button>

      {/* Enrich Button */}
      <button
        onClick={enrich}
        disabled={loading}
        className={`px-4 py-2 rounded mb-6 ml-3 text-white flex items-center gap-2 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        )}
        {loading ? "Enriching..." : "Enrich"}
      </button>

      {/* Notes */}
      <div className="border border-gray-200 p-4 rounded bg-white mb-6">
        <h2 className="font-semibold mb-2">Notes</h2>
        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          value={notes}
          onChange={(e) => saveNotes(e.target.value)}
        />
      </div>

      {/* Empty State */}
      {!enrichment && !loading && (
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400">
          Click <b>Enrich</b> to fetch company intelligence
        </div>
      )}

      {/* Enrichment Result */}
      {enrichment && (
        <div className="space-y-4 border border-gray-200 p-6 rounded-lg bg-white shadow-sm">

          <h2 className="font-semibold text-lg">Live Enrichment</h2>

          {/* Summary */}
          <div>
            <h3 className="font-semibold mb-1">Summary</h3>
            <p className="text-gray-700">
              {typeof enrichment.result === "object"
                ? enrichment.result.summary
                : "No summary available"}
            </p>
          </div>

          {/* What They Do */}
          <div>
            <h3 className="font-semibold mb-1">What They Do</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {typeof enrichment.result === "object" &&
                enrichment.result.what_they_do?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
            </ul>
          </div>

          {/* Keywords */}
          <div>
            <h3 className="font-semibold mb-1">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {typeof enrichment.result === "object" &&
                enrichment.result.keywords?.map((k: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {k}
                  </span>
                ))}
            </div>
          </div>

          {/* Signals */}
          <div>
            <h3 className="font-semibold mb-1">Signals</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {typeof enrichment.result === "object" &&
                enrichment.result.derived_signals?.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-400">
            Provider: {enrichment.provider || "unknown"} •{" "}
            {enrichment.time
              ? new Date(enrichment.time).toLocaleString()
              : ""}
          </div>

        </div>
      )}
    </div>
  );
}