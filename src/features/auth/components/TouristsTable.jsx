// TouristsTable Component
function TouristsTable({ tourists }) {
  return (
    <section className="mt-10 overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100">
      <div className="border-b border-stone-100 p-6">
        <h2 className="text-2xl font-bold text-[#3f2b1a]">Registered Tourists</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-left text-sm">
          <thead className="bg-[#f9f3e9] text-[#725a40]">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {tourists.map((tourist) => (
              <tr key={tourist.id} className="border-t border-stone-100 hover:bg-stone-50/50">
                <td className="p-4 font-bold text-[#3f2b1a]">{tourist.name}</td>
                <td className="p-4 text-[#695744]">{tourist.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TouristsTable;
