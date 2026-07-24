import { Check, X } from 'lucide-react';

// GuideRegistrationsTable Component
function GuideRegistrationsTable({ tourGuides, onApprove, onReject }) {
  return (
    <section className="mt-10 overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100">
      <div className="border-b border-stone-100 p-6">
        <h2 className="text-2xl font-bold text-[#3f2b1a]">Tour Guide Registrations</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-left text-sm">
          <thead className="bg-[#f9f3e9] text-[#725a40]">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tourGuides.map((guide) => (
              <tr key={guide.id} className="border-t border-stone-100 hover:bg-stone-50/50">
                <td className="p-4 font-bold text-[#3f2b1a]">{guide.name}</td>
                <td className="p-4 text-[#695744]">{guide.email}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      guide.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : guide.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {guide.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {guide.status === 'Pending approval' && (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onReject(guide.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                        title="Reject Application"
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={() => onApprove(guide.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-md cursor-pointer"
                        title="Approve Application"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default GuideRegistrationsTable;
