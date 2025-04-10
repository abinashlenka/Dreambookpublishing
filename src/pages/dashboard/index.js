// ✅ Full Dashboard with All Sections, Toggle, Pagination, Modal Search & Fixes
import Layout from "@/layout/Layout";
import Table from "@/modules/Table";
import Pagination from "@/modules/Pagination";
import { useEffect, useState } from "react";

export default function Index({ role }) {
  const [platformStats] = useState([{ platform: "amazon", quantity: 31, total: "₹9663.00" }]);
  const [topAuthors] = useState([
    { name: "Lark Hazley", sales: 100, earnings: 20000, returned: 10, returnRoyalty: 500, toPay: 4500 },
    { name: "Lauralee Solak", sales: 90, earnings: 18000, returned: 8, returnRoyalty: 400, toPay: 4200 },
  ]);

  const [royalties] = useState([
    { id: 1, name: "Lark Hazley", toPay: 4500, status: "unpaid", month: "2025-04" },
    { id: 2, name: "Lauralee Solak", toPay: 4500, status: "paid", month: "2025-04" },
    { id: 3, name: "John Doe", toPay: 3500, status: "unpaid", month: "2025-04" },
    { id: 4, name: "Priya Sharma", toPay: 2200, status: "paid", month: "2025-04" },
    { id: 5, name: "Amit Verma", toPay: 1800, status: "unpaid", month: "2025-03" },
    { id: 6, name: "Alex Singh", toPay: 3200, status: "paid", month: "2025-03" }
  ]);

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

<<<<<<< HEAD
  const [searchRoyalties, setSearchRoyalties] = useState("");
  const [showPaid, setShowPaid] = useState(false);
  const [royaltyFilters, setRoyaltyFilters] = useState({ page: 1, limit: 5 });
  const [royaltyPaginationData, setRoyaltyPaginationData] = useState(null);
  const [selectedRoyalty, setSelectedRoyalty] = useState(null);
=======
  const [bookPage, setBookPage] = useState(1);
  const booksPerPage = 10;

  const fetchDashboardData = async () => {
    const bookRes = await getAllBooks({ page: 1, limit: 1000 });
    const books = Array.isArray(bookRes?.data) ? bookRes.data : [];
>>>>>>> 4dcc93816a8ea130867bb6831906e3740d249ac6

  const [modalPage, setModalPage] = useState(1);
  const [modalSearch, setModalSearch] = useState("");
  const modalLimit = 5;

  const dummyModalBooks = Array.from({ length: 12 }, (_, i) => ({
    book: i % 2 === 0 ? "Lark Hazley" : "Lauralee Solak",
    sales: 100,
    royalty: 20000,
    returned: 10,
    returnRoyalty: 500,
    toPay: 4500
  }));

  const filteredModalBooks = dummyModalBooks.filter((b) => b.book.toLowerCase().includes(modalSearch.toLowerCase()));
  const paginatedModalBooks = filteredModalBooks.slice((modalPage - 1) * modalLimit, modalPage * modalLimit);
  const modalTotalAmount = selectedRoyalty?.status === "paid" ? 0 : filteredModalBooks.reduce((acc, b) => acc + b.toPay, 0);

  const [paginatedRoyalties, setPaginatedRoyalties] = useState([]);

  useEffect(() => {
    const updated = royalties
      .filter((r) => r.name.toLowerCase().includes(searchRoyalties.toLowerCase()))
      .filter((r) => r.month === selectedMonth)
      .filter((r) => (showPaid ? r.status === "paid" : r.status !== "paid"));

    const total = updated.length;
    const start = (royaltyFilters.page - 1) * royaltyFilters.limit;
    const paginated = updated.slice(start, start + royaltyFilters.limit);

    setPaginatedRoyalties(paginated);
    setRoyaltyPaginationData({
      page: royaltyFilters.page,
      limit: royaltyFilters.limit,
      totalPages: Math.ceil(total / royaltyFilters.limit),
      totalResults: total,
    });
<<<<<<< HEAD
  }, [royalties, royaltyFilters, searchRoyalties, selectedMonth, showPaid]);
=======
  };

  const fetchSalesData = async () => {
    try {
      const res = await axios.get("https://dream-book-backend-main.vercel.app/api/orders");
      const orders = res.data?.data || [];

      const selectedDate = new Date(selectedMonth + "-01");
      const selectedYear = selectedDate.getFullYear();
      const selectedMonthIndex = selectedDate.getMonth();

      const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getFullYear() === selectedYear &&
          orderDate.getMonth() === selectedMonthIndex
        );
      });

      const platformMap = {};
      const bookMap = {};
      const authorMap = {};
      let totalSales = 0;

      filteredOrders.forEach((order) => {
        const platform = order.source || "Unknown";
        const total = parseFloat(order.total || 0);
        platformMap[platform] = platformMap[platform] || { total: 0, count: 0 };
        platformMap[platform].total += total;
        platformMap[platform].count += 1;
        totalSales += total;

        order.line_items?.forEach((item) => {
          const title = item.name;
          const author = item.author || "Unknown Author";
          const qty = item.quantity || 1;
          const price = parseFloat(item.price || 0);

          bookMap[title] = bookMap[title] || { quantity: 0, earnings: 0 };
          bookMap[title].quantity += qty;
          bookMap[title].earnings += price;

          authorMap[author] = authorMap[author] || { sales: 0, earnings: 0 };
          authorMap[author].sales += qty;
          authorMap[author].earnings += price;
        });
      });

      setPlatformStats(Object.entries(platformMap).map(([p, val]) => ({
        platform: p,
        quantity: val.count,
        total: `₹${val.total.toFixed(2)}`
      })));

      const sortedBooks = Object.entries(bookMap)
        .map(([title, val]) => ({
          title,
          quantity: val.quantity,
          total: val.earnings,
        }))
        .sort((a, b) => b.total - a.total);

      setBookStats(sortedBooks);

      setTopAuthors(Object.entries(authorMap).map(([name, val]) => {
        const returned = 2;
        const returnRoyalty = val.earnings * 0.1;
        const toPay = val.earnings - returnRoyalty;
        return {
          name,
          sales: val.sales,
          earnings: val.earnings,
          returned,
          returnRoyalty,
          toPay,
        };
      }));

      setTotalSalesAmount(totalSales);
    } catch (err) {
      console.error("Failed to fetch order data", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    fetchSalesData();
  }, [selectedMonth]);

  const paginatedBooks = bookStats.slice(
    (bookPage - 1) * booksPerPage,
    bookPage * booksPerPage
  );
  const totalBookPages = Math.ceil(bookStats.length / booksPerPage);

  const cards = [
    {
      title: "Platform Earnings",
      value: `₹${dashboardData.platformEarnings}`,
      bgColor: "#E9FFE0",
    },
    {
      title: "Total Royalty",
      value: `₹${dashboardData.totalRoyalty}`,
      bgColor: "#FFE9E0",
    },
    {
      title: "Total Books",
      value: dashboardData.totalBooks,
      bgColor: "#FFEAFB",
    },
    {
      title: "Total Sale",
      value: dashboardData.totalSales,
      bgColor: "#E6E9FF",
    },
    {
      title: "Total Authors",
      value: dashboardData.totalAuthors,
      bgColor: "#FFF6E4",
    }
  ];

  const iconMap = {
    "Platform Earnings": "Totalplatform.png",
    "Total Royalty": "Totalroyalty.png",
    "Total Books": "Totalbooks.png",
    "Total Sale": "Totalsale.png",
    "Total Authors": "Totalauthors.png"
  };
>>>>>>> 4dcc93816a8ea130867bb6831906e3740d249ac6

  return (
    <Layout role={role}>
      {/* Dashboard Cards */}
      <div className="w-full grid grid-cols-5 gap-4 mb-6">
        {[
          { title: "Platform Earnings", value: "₹41,400", icon: "Totalplatform.png", bgColor: "#E9FFE0" },
          { title: "Total Royalty", value: "₹34,500", icon: "Totalroyalty.png", bgColor: "#FFE9E0" },
          { title: "Total Books", value: "690", icon: "Totalbooks.png", bgColor: "#FFEAFB" },
          { title: "Total Sale", value: "6,900", icon: "Totalsale.png", bgColor: "#E6E9FF" },
          { title: "Total Authors", value: "1", icon: "Totalauthors.png", bgColor: "#FFF6E4" }
        ].map((card, idx) => (
          <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: card.bgColor }}>
            <div className="flex gap-2 items-center">
              <img src={`/images/${card.icon}`} alt={card.title} className="w-6 h-6" />
              <span className="font-semibold text-black text-sm">{card.title}</span>
            </div>
            <div className="mt-4 text-2xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Sales Report */}
      <div className="w-full bg-white rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold">Sales Report</h2>
          <select
            className="border px-2 py-1 text-sm rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date();
              date.setMonth(date.getMonth() - i);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              return (
                <option key={i} value={`${year}-${month}`}>
                  {date.toLocaleString("default", { month: "long", year: "numeric" })}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-2 text-sm text-gray-700 font-medium">
          Total Sales: <span className="font-bold">₹9663.00</span>
        </div>
        <Table>
          <thead>
            <tr className="border-b">
              <th className="text-left">Platform</th>
              <th className="text-center">Orders</th>
              <th className="text-center">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {platformStats.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="text-left flex gap-2 items-center">
                  <img src="/images/amazon.png" alt="Amazon" className="w-5 h-5" />
                  {item.platform}
                </td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

<<<<<<< HEAD
      {/* Top Authors */}
      <div className="w-full bg-white rounded-lg p-4 mb-6">
=======
      {/* ✅ Book Wise Report - Sorted & Paginated */}
      <div className="w-full bg-white rounded-lg p-4 mt-6">
        <h2 className="text-base font-semibold mb-3">Book-wise Sales</h2>
        <Table>
          <thead>
            <tr className="border-b-1.5">
              <th className="text-left">Title</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total Earnings</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBooks.map((book, i) => (
              <tr key={i} className="border-b-1.5">
                <td>{book.title}</td>
                <td className="text-center">{book.quantity}</td>
                <td className="text-center">₹{book.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => setBookPage((p) => Math.max(p - 1, 1))}
            disabled={bookPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2 py-1 text-sm">
            Page {bookPage} of {totalBookPages}
          </span>
          <button
            onClick={() => setBookPage((p) => Math.min(p + 1, totalBookPages))}
            disabled={bookPage === totalBookPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* ✅ Top Authors Table */}
      <div className="w-full bg-white rounded-lg p-4 mt-6">
>>>>>>> 4dcc93816a8ea130867bb6831906e3740d249ac6
        <h2 className="text-base font-semibold mb-3">Top Rated Authors</h2>
        <Table>
          <thead>
            <tr className="border-b">
              <th className="text-left">Author</th>
              <th className="text-center">Sales</th>
              <th className="text-center">Earnings</th>
              <th className="text-center">Returned</th>
              <th className="text-center">Return Royalty</th>
              <th className="text-center">To Pay</th>
            </tr>
          </thead>
          <tbody>
            {topAuthors.map((a, i) => (
              <tr key={i} className="border-b">
                <td>{a.name}</td>
                <td className="text-center">{a.sales}</td>
                <td className="text-center">₹{a.earnings.toFixed(2)}</td>
                <td className="text-center">{a.returned}</td>
                <td className="text-center text-orange">-₹{a.returnRoyalty.toFixed(2)}</td>
                <td className="text-center">₹{a.toPay.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* ✅ Total Royalties section and modal are preserved below (if admin) */}
      {role === "admin" && (
        <div className="w-full bg-white rounded-lg p-4 mt-6">
          <h2 className="text-base font-semibold mb-3">Total Royalties to Pay</h2>
          <div className="flex items-center gap-4 mb-4">
            <input
              className="border px-2 py-1 rounded text-sm w-60"
              placeholder="Search author name"
              value={searchRoyalties}
              onChange={(e) => setSearchRoyalties(e.target.value)}
            />
            <button
              className="border px-3 py-1 rounded text-sm"
              onClick={() => setShowPaid((prev) => !prev)}
            >
              {showPaid ? "Show Unpaid" : "Show Paid"}
            </button>
          </div>
          <Table>
            <thead>
              <tr className="border-b">
                <th className="text-left">Author</th>
                <th className="text-center">To Pay</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRoyalties.map((a) => (
                <tr key={a.id} className="border-b">
                  <td>{a.name}</td>
                  <td className="text-center">₹{a.status === "paid" ? 0 : a.toPay.toFixed(2)}</td>
                  <td className="text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${a.status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {a.status === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => setSelectedRoyalty(a)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex justify-end mt-4">
            {royaltyPaginationData && (
              <Pagination
                filters={royaltyFilters}
                data={royaltyPaginationData}
                handler={(keyword, status, page, limit, sort) => {
                  setRoyaltyFilters((prev) => ({ ...prev, page: page ?? 1, limit: limit ?? 5 }));
                }}
              />
            )}
          </div>

          {selectedRoyalty && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">All Details</h3>
                  <div className="flex gap-3 items-center">
                    <input
                      placeholder="Search book name"
                      className="border px-2 py-1 text-sm rounded"
                      value={modalSearch}
                      onChange={(e) => setModalSearch(e.target.value)}
                    />
                    <span className="text-sm font-medium">
                      Total Amount to pay: <strong>₹{modalTotalAmount.toLocaleString()}</strong>
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">Pay Now</button>
                  </div>
                </div>
                <Table>
                  <thead>
                    <tr className="border-b">
                      <th className="text-left">Book Name</th>
                      <th className="text-center">Total Sales</th>
                      <th className="text-center">Total Royalty</th>
                      <th className="text-center">Total Returned</th>
                      <th className="text-center">Return Royalty</th>
                      <th className="text-center">Total to pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedModalBooks.map((b, i) => (
                      <tr key={i} className="border-b">
                        <td>{b.book}</td>
                        <td className="text-center">{b.sales}</td>
                        <td className="text-center">₹{b.royalty.toLocaleString()}</td>
                        <td className="text-center">{b.returned}</td>
                        <td className="text-center text-orange">-₹{b.returnRoyalty.toLocaleString()}</td>
                        <td className="text-center">₹{b.toPay.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="flex justify-between items-center mt-4">
                  <button onClick={() => setSelectedRoyalty(null)} className="px-4 py-2 border rounded">
                    Close
                  </button>
                  <Pagination
                    filters={{ page: modalPage, limit: modalLimit }}
                    data={{
                      page: modalPage,
                      limit: modalLimit,
                      totalPages: Math.ceil(filteredModalBooks.length / modalLimit),
                      totalResults: filteredModalBooks.length,
                    }}
                    handler={(keyword, status, page) => setModalPage(page ?? 1)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const role = req.cookies._r || null;
<<<<<<< HEAD
  return { props: { role } };
}
=======
  return {
    props: { role },
  };
}
>>>>>>> 4dcc93816a8ea130867bb6831906e3740d249ac6
