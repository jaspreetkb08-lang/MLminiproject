import React, { useState, useMemo } from "react";
import { usePredictions } from "../context/PredictionContext";
import {
  History,
  Search,
  Filter,
  Download,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Building,
  RotateCcw,
  X,
  PlusCircle,
  FileSpreadsheet
} from "lucide-react";

export default function HistoryPage() {
  const { history, addPrediction, removePrediction, resetHistoryToDefault } = usePredictions();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hotelFilter, setHotelFilter] = useState("all");
  const [sortField, setSortField] = useState("predictionDate");
  const [sortOrder, setSortOrder] = useState("desc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Selected reservation for Details Modal
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Filter & Sort Logic
  const filteredData = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.hotelType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.country && item.country.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "high" && (item.predictionClass === 1 || item.predictedStatus.includes("High"))) ||
        (statusFilter === "low" && (item.predictionClass === 0 || item.predictedStatus.includes("Lower")));

      const matchesHotel =
        hotelFilter === "all" ||
        item.hotelType.toLowerCase().includes(hotelFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesHotel;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [history, searchTerm, statusFilter, hotelFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Booking ID",
      "Hotel Type",
      "Lead Time",
      "Customer Type",
      "Predicted Status",
      "Prediction Class",
      "Confidence (%)",
      "Model Used",
      "Prediction Date",
      "ADR ($)",
      "Deposit Type",
      "Country"
    ];

    const rows = filteredData.map((d) => [
      `"${d.id}"`,
      `"${d.hotelType}"`,
      d.leadTime,
      `"${d.customerType}"`,
      `"${d.predictedStatus}"`,
      d.predictionClass !== undefined ? d.predictionClass : (d.predictedStatus.includes("High") ? 1 : 0),
      d.confidence || "",
      `"${d.modelUsed}"`,
      `"${d.predictionDate}"`,
      d.adr || "",
      `"${d.depositType || ""}"`,
      `"${d.country || ""}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `StayWise_Prediction_History_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add sample booking directly to test table reactivity
  const handleAddSampleRecord = () => {
    const isCancel = Math.random() > 0.5;
    const randomId = `SW-${Math.floor(10000 + Math.random() * 90000)}`;
    addPrediction({
      id: randomId,
      hotelType: Math.random() > 0.4 ? "City Hotel" : "Resort Hotel",
      leadTime: Math.floor(10 + Math.random() * 200),
      customerType: "Transient",
      predictedStatus: isCancel ? "High Risk" : "Lower Risk",
      predictionClass: isCancel ? 1 : 0,
      confidence: Math.round((70 + Math.random() * 25) * 10) / 10,
      modelUsed: "Random Forest",
      predictionDate: new Date().toISOString().slice(0, 16).replace("T", " "),
      adr: Math.round((90 + Math.random() * 120) * 100) / 100,
      depositType: isCancel && Math.random() > 0.5 ? "Non Refund" : "No Deposit",
      marketSegment: "Online TA",
      specialRequests: isCancel ? 0 : 2,
      country: "PRT",
      riskFactors: isCancel
        ? ["Extended booking lead time", "Zero special requests logged"]
        : ["Short booking horizon", "High guest engagement requests"],
      recommendedAction: isCancel
        ? "Verify credit card authorization 7 days prior to arrival."
        : "Prepare luxury VIP welcome amenities for verified guest."
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/90 dark:border-stone-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="folio-tag">FOLIO N° 06 · PREDICTION AUDIT LOG</span>
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              Audit Trail & Verification
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-burgundy dark:text-ivory">
            Prediction History & Records
          </h1>
          <p className="text-sm font-serif text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Immutable audit record of reservation classifications evaluated by StayWise AI. Contains sample audit records and active session predictions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleAddSampleRecord}
            className="btn-secondary text-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Simulate Log</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="btn-primary text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={resetHistoryToDefault}
            title="Reset history to default records"
            className="p-2 rounded border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-burgundy dark:hover:text-gold transition-colors text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="folio-card p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Search Input */}
        <div className="sm:col-span-5 relative">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by ID, hotel, customer, or country..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100 placeholder-stone-400"
          />
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
          >
            <option value="all">All Risk Statuses</option>
            <option value="high">High Risk Only</option>
            <option value="low">Lower Risk Only</option>
          </select>
        </div>

        {/* Hotel Filter */}
        <div className="sm:col-span-2">
          <select
            value={hotelFilter}
            onChange={(e) => {
              setHotelFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
          >
            <option value="all">All Properties</option>
            <option value="city">City Hotel</option>
            <option value="resort">Resort Hotel</option>
          </select>
        </div>

        {/* Page Size & Counter */}
        <div className="sm:col-span-2 flex items-center justify-end gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
            className="px-2 py-1 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono"
          >
            <option value={5}>5 / page</option>
            <option value={8}>8 / page</option>
            <option value={15}>15 / page</option>
            <option value={25}>25 / page</option>
          </select>
          <span>{filteredData.length} records</span>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="folio-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50/80 dark:bg-stone-900/60 border-b border-stone-200/90 dark:border-stone-800 font-mono text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
                <th
                  onClick={() => toggleSort("id")}
                  className="py-3 px-4 cursor-pointer hover:text-stone-800 dark:hover:text-stone-200"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Booking ID</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("hotelType")}
                  className="py-3 px-4 cursor-pointer hover:text-stone-800 dark:hover:text-stone-200"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Hotel Type</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort("leadTime")}
                  className="py-3 px-4 cursor-pointer hover:text-stone-800 dark:hover:text-stone-200"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Lead Time</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Customer Type</th>
                <th
                  onClick={() => toggleSort("predictedStatus")}
                  className="py-3 px-4 cursor-pointer hover:text-stone-800 dark:hover:text-stone-200"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Predicted Status</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Model</th>
                <th
                  onClick={() => toggleSort("predictionDate")}
                  className="py-3 px-4 cursor-pointer hover:text-stone-800 dark:hover:text-stone-200"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Date Evaluated</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
              {paginatedData.length > 0 ? (
                paginatedData.map((record) => {
                  const isHigh =
                    record.predictionClass === 1 ||
                    record.predictedStatus.toLowerCase().includes("high");

                  return (
                    <tr
                      key={record.id}
                      className="hover:bg-stone-50/50 dark:hover:bg-stone-900/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-medium text-burgundy dark:text-ivory">
                        {record.id}
                      </td>
                      <td className="py-3 px-4 font-serif text-stone-800 dark:text-stone-200">
                        {record.hotelType}
                      </td>
                      <td className="py-3 px-4 font-mono text-stone-600 dark:text-stone-300">
                        {record.leadTime}d
                      </td>
                      <td className="py-3 px-4 text-stone-600 dark:text-stone-300 font-serif">
                        {record.customerType}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${
                            isHigh
                              ? "bg-rose-50/60 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-900"
                              : "bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900"
                          }`}
                        >
                          {record.predictedStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                        {record.modelUsed}
                      </td>
                      <td className="py-3 px-4 text-stone-500 dark:text-stone-400 font-mono text-[11px]">
                        {record.predictionDate}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedRecord(record)}
                            title="Inspect Audit Profile"
                            className="p-1 rounded text-stone-500 hover:text-burgundy dark:hover:text-gold"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removePrediction(record.id)}
                            title="Delete Record"
                            className="p-1 rounded text-stone-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center font-serif text-stone-400">
                    No matching booking prediction records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="p-3.5 border-t border-stone-200/90 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-stone-500 dark:text-stone-400">
          <div>
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} records
          </div>
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2 py-1 rounded border border-stone-200 dark:border-stone-700 disabled:opacity-40 hover:bg-stone-50 dark:hover:bg-stone-800"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="px-2">
              <span>{currentPage}</span>
              <span className="opacity-40"> / </span>
              <span>{totalPages}</span>
            </div>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-2 py-1 rounded border border-stone-200 dark:border-stone-700 disabled:opacity-40 hover:bg-stone-50 dark:hover:bg-stone-800"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* RESERVATION AUDIT PROFILE MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="folio-card max-w-lg w-full p-6 space-y-4 relative shadow-xl">
            
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 p-1 rounded text-stone-400 hover:text-stone-800 dark:hover:text-stone-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 border-b border-stone-200/80 dark:border-stone-800 pb-3">
              <span className="font-mono text-sm font-semibold text-burgundy dark:text-gold">
                {selectedRecord.id}
              </span>
              <span className="text-xs font-serif text-stone-500 dark:text-stone-400">
                · Reservation Audit Record
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 font-mono">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Property</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{selectedRecord.hotelType}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Lead Horizon</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{selectedRecord.leadTime} days</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Rate (ADR)</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">${selectedRecord.adr || "120.00"}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Deposit</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{selectedRecord.depositType || "No Deposit"}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Origin</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{selectedRecord.country || "PRT"}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Requests</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{selectedRecord.specialRequests ?? 0}</span>
                </div>
              </div>

              {selectedRecord.riskFactors && (
                <div className="space-y-1 font-serif">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-burgundy dark:text-gold block">
                    Risk Diagnostics
                  </span>
                  <ul className="space-y-1 pl-4 list-disc text-stone-600 dark:text-stone-300">
                    {selectedRecord.riskFactors.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRecord.recommendedAction && (
                <div className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 font-serif">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-burgundy dark:text-gold block mb-0.5">
                    Recommended Hospitality Action
                  </span>
                  <p>{selectedRecord.recommendedAction}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="btn-primary text-xs"
              >
                Close Audit Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}