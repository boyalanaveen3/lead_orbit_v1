import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import { leadslist } from "../../services/LeadsList";
import "./Leads.css";

type Lead = {
  lead_id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_no: string;
  company_name: string;
  source: string;
  remarks: string;
  status: string;
  created_at: string;
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const [page,setPage]=useState(1)
 const [totalPages,setTotalPages]=useState(1)
 const limit=5;
 useEffect(()=>{
leadsdata()
 },[page])
 const leadsdata=async ()=>{
  try{
   setLoading(true)
   const resposne=await leadslist({page,limit})
   const paginationData = resposne?.data;
   const list = paginationData?.data ?? [];
   const total = paginationData?.total ?? 0;
   setLeads(list);
   setTotalPages(Math.floor(total / limit) + (total % limit > 0 ? 1 : 0));
  }catch(error:any){
   setError("Failed to fetch data")
   console.log(error);
  }finally{
    setLoading(false)
  }
 }

  return (
    <AppLayout>
      <section className="leads-page">
        <div className="leads-page-header">
          <div>
            <p className="leads-eyebrow">Sales pipeline</p>
            <h1 className="leads-title">Leads</h1>
          </div>
        </div>

        {loading && <p className="leads-state">Loading leads...</p>}
        {error && !loading && <p className="leads-error">{error}</p>}
        {!loading && !error && leads.length === 0 && (/*  */
          <p className="leads-state">No leads found.</p>
        )}

        {!loading && !error && leads.length > 0 && (
          <div className="leads-table-wrap">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Source</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={lead.lead_id}>
                    <td>{i + 1}</td>
                    <td>{lead.firstname} {lead.lastname}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone_no}</td>
                    <td>{lead.company_name}</td>
                    <td>{lead.source}</td>
                    <td>{lead.remarks || "—"}</td>
                    <td><span className={`status-badge status-${lead.status}`}>{lead.status}</span></td>
                    <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && !error && leads.length > 0 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page}</span>
            <button disabled={leads.length < limit} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        )}
      </section>
    </AppLayout>
  );
}
