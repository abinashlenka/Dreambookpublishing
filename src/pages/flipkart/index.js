import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout/Layout";
import Button from "@/components/Button";
import { ChevronDown, UploadCloud } from "lucide-react";
import Pagination from "@/modules/Pagination"; // adjust path if needed

const FlipkartData = () => {
  const router = useRouter();
  const userRole = "admin";

  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const uploadHistory = new Array(10).fill({
    name: "Flipkart data .csv",
    date: "10/12/2024"
  });

  const paginatedData = uploadHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(uploadHistory.length / itemsPerPage);

  useEffect(() => {
    if (userRole !== "admin") {
      router.replace("/dashboard");
    }
  }, []);

  if (userRole !== "admin") return null;

  return (
    <Layout role={userRole}>
      <div className="p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h1 className="text-2xl font-semibold whitespace-nowrap">Flipkart data</h1>
          <div className="shrink-0">
            <Button className="bg-primary text-white px-6 py-2 whitespace-nowrap" onClick={() => setShowModal(true)}>
              Upload
            </Button>
          </div>
        </div>

        {/* Upload History Card */}
        <div className="bg-white rounded-xl shadow-sm p-0 overflow-hidden">
          {/* Header + filter inside same row */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between border-b px-6 py-4 gap-4">
  <h2 className="text-xl font-semibold text-black leading-tight">
    Upload history
  </h2>
  <div className="shrink-0">
    <Button
      variant="outline"
      className="flex items-center gap-1 whitespace-nowrap"
    >
      This Month <ChevronDown size={16} />
    </Button>
  </div>
</div>


          {/* Table-like rows */}
          <div className="divide-y border-x border-b rounded-none px-6">
            <div className="grid grid-cols-2 font-semibold p-3">
              <span>File name</span>
              <span className="text-right">Uploaded date</span>
            </div>
            {paginatedData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 p-3 hover:bg-gray-50 text-sm"
              >
                <span>{item.name}</span>
                <span className="text-right">{item.date}</span>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="px-6 pb-4 pt-6">
            <Pagination
              filters={{
                keyword: "",
                status: "",
                sort: "",
                page: currentPage,
                limit: itemsPerPage
              }}
              data={{
                totalPages,
                totalResults: uploadHistory.length
              }}
              handler={(keyword, status, page, limit, sort) => {
                setCurrentPage(page);
                setItemsPerPage(limit);
              }}
            />
          </div>
        </div>

        {/* Upload Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
              <h2 className="text-xl font-semibold mb-4">Upload your files</h2>
              <div className="space-y-4">
              {["Flipkart Products Data", "Flipkart Orders Data"].map((label, index) => (
  <label
    key={index}
    className="block border rounded-xl px-6 py-8 text-center cursor-pointer hover:bg-gray-50"
  >
    <input type="file" accept=".csv" className="hidden" />
    <div className="flex flex-col items-center">
      <UploadCloud className="h-8 w-8 mb-2 text-gray-500" />
      <span className="font-medium text-gray-700">
        Upload {label}<span className="text-red-500">*</span>
      </span>
      <p className="text-xs text-gray-400 mt-1">
        ( Acceptable formats: csv only Max 2mb )
      </p>
    </div>
  </label>
))}

              </div>
              <Button className="mt-6 w-full bg-primary text-white">Upload</Button>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FlipkartData;
