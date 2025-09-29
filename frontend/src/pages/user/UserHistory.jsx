import { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import api from "../../utils/api";

export default function UserHistory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api
      .get("/api/gizi/history")
      .then((res) => setRows(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="bg-gray-100 min-h-[calc(100vh-64px)]">
        <div className="max-w-5xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="px-6 py-4 font-semibold text-lg">Riwayat Perhitungan</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Tanggal</th>
                    <th className="p-3 text-left">Usia</th>
                    <th className="p-3 text-left">BB</th>
                    <th className="p-3 text-left">TB</th>
                    <th className="p-3 text-left">Kalori</th>
                    <th className="p-3 text-left">Protein</th>
                    <th className="p-3 text-left">Karbo</th>
                    <th className="p-3 text-left">Lemak</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td className="p-6 text-center" colSpan={8}>
                        Belum ada data riwayat.
                      </td>
                    </tr>
                  ) : (
                    rows.map((r) => (
                      <tr key={r._id} className="odd:bg-gray-50">
                        <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
                        <td className="p-3">{r.usia}</td>
                        <td className="p-3">{r.berat}</td>
                        <td className="p-3">{r.tinggi}</td>
                        <td className="p-3">{r.hasil?.kalori}</td>
                        <td className="p-3">{r.hasil?.protein}</td>
                        <td className="p-3">{r.hasil?.karbohidrat}</td>
                        <td className="p-3">{r.hasil?.lemak}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
