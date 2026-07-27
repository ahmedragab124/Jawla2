import { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ViewDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("id, name, description")
        .order("name", { ascending: true });
      if (error) toast.error("Failed to load destinations");
      else setDestinations(data || []);
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?"))
      return;
    const { error } = await supabase.from("destinations").delete().eq("id", id);
    if (error)
      return toast.error(error.message || "Failed to delete destination");
    toast.success("Destination deleted");
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20 min-h-[40vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#b57a2d] border-t-transparent" />
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">
            Manage
          </p>
          <h1 className="mt-2 text-4xl font-black text-[#3f2b1a]">
            Destinations
          </h1>
          <p className="mt-1 text-sm text-[#695744]">
            View, edit, or delete existing destinations.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/dashboard/destinations/add")}
          className="rounded-full bg-[#b57a2d] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#9b6525] cursor-pointer"
        >
          + Add New
        </button>
      </header>

      <section className="overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-[#f9f3e9] text-[#725a40]">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-8 text-center text-stone-400 font-medium"
                  >
                    No destinations found.
                  </td>
                </tr>
              ) : (
                destinations.map((d) => (
                  <tr
                    key={d.id}
                    className="border-t border-stone-100 hover:bg-stone-50/50"
                  >
                    <td className="p-4 font-bold text-[#3f2b1a]">{d.name}</td>
                    <td className="p-4 text-[#695744] max-w-xs truncate">
                      {d.description}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/dashboard/destinations/edit/${d.id}`,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition cursor-pointer"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ViewDestinations;
