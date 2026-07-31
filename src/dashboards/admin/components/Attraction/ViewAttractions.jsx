import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabase";
import { toast } from "react-toastify";
import { TableSkeleton } from "../../../../shared/components/ui/Skeleton";

function ViewAttractions() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttractions = async () => {
      const { data, error } = await supabase
        .from("attractions")
        .select("id, name, category, destinationId, star")
        .order("name", { ascending: true });
      if (error) toast.error("Failed to load attractions");
      else setAttractions(data || []);
      setLoading(false);
    };
    fetchAttractions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attraction?"))
      return;
    const { error } = await supabase.from("attractions").delete().eq("id", id);
    if (error)
      return toast.error(error.message || "Failed to delete attraction");
    toast.success("Attraction deleted");
    setAttractions((prev) => prev.filter((a) => a.id !== id));
  };

  if (loading)
    return (
      <div className="mx-auto max-w-6xl">
        <TableSkeleton rows={5} />
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
            Attractions
          </h1>
          <p className="mt-1 text-sm text-[#695744]">
            View, edit, or delete existing attractions.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/dashboard/attractions/add")}
          className="rounded-full bg-[#b57a2d] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#9b6525] cursor-pointer"
        >
          + Add New
        </button>
      </header>

      <section className="overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-[#f9f3e9] text-[#725a40]">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Destination ID</th>
                <th className="p-4">Stars</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attractions.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-8 text-center text-stone-400 font-medium"
                  >
                    No attractions found.
                  </td>
                </tr>
              ) : (
                attractions.map((a) => (
                  <tr
                    key={a.id}
                    className="border-t border-stone-100 hover:bg-stone-50/50"
                  >
                    <td className="p-4 font-bold text-[#3f2b1a]">{a.name}</td>
                    <td className="p-4 text-[#695744]">{a.category}</td>
                    <td className="p-4 text-[#695744] text-xs font-mono">
                      {a.destinationId}
                    </td>
                    <td className="p-4 text-[#695744]">
                      {"⭐".repeat(Math.round(a.star || 0))}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/dashboard/attractions/edit/${a.id}`,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition cursor-pointer"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
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

export default ViewAttractions;
