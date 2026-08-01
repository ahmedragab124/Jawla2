import { useState } from "react";
import { Mail, Phone, Globe2, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import TouristProfileEditForm from "./TouristProfileEditForm";
import { supabase } from "../../../supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Define the Validation Schema
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  bio: z.string().max(180, "Bio must be less than 180 characters").optional().or(z.literal("")),
  avatar: z.string().optional().or(z.literal("")),
});

function TouristProfileSidebar({ user, bookings, onUserUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      bio: user.bio || "",
      avatar: user.avatar || "",
    },
  });

  const avatarValue = watch("avatar");
  const nameValue = watch("name");

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
      toast.error("Please choose an image smaller than 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setValue("avatar", reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    const name = data.name.trim();
    const email = data.email.trim().toLowerCase();

    setSaving(true);
    try {
      const { data: updatedUser, error: userError } = await supabase
        .from("users")
        .update({
          name,
          email,
          phone: data.phone?.trim() || "",
          location: data.location?.trim() || "",
          bio: data.bio?.trim() || "",
          avatar: data.avatar || "",
        })
        .eq("id", user.id)
        .select()
        .single();

      if (userError) throw userError;

      const affectedBookings = bookings.filter(
        (b) => b.touristId === user.id || b.touristEmail === user.email,
      );
      await Promise.all(
        affectedBookings.map(async (b) => {
          await supabase
            .from("bookings")
            .update({
              touristName: name,
              touristEmail: email,
              email,
              phone: data.phone?.trim() || "",
            })
            .eq("id", b.id);
        }),
      );

      onUserUpdated(updatedUser);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50 sticky top-24">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-[#f9ecd8] text-2xl font-black text-[#7a5540] ring-4 ring-white shadow-lg">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
        ) : (
          user.name?.trim().charAt(0).toUpperCase() || "T"
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">{user.role} Account</p>
          <h2 className="mt-2 text-3xl font-black text-[#3f2b1a]">{user.name}</h2>
        </div>
        {!isEditing && (
          <button
            onClick={() => {
              reset({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                location: user.location || "",
                bio: user.bio || "",
                avatar: user.avatar || "",
              });
              setIsEditing(true);
            }}
            className="rounded-xl border border-[#e6d8c5] p-2 text-[#b57a2d] hover:bg-[#fff7ea] cursor-pointer"
          >
            <Pencil size={17} />
          </button>
        )}
      </div>

      {isEditing ? (
        <TouristProfileEditForm
          register={register}
          errors={errors}
          avatarValue={avatarValue}
          nameValue={nameValue}
          saving={saving}
          onPhotoChange={handlePhotoChange}
          onSave={handleSubmit(onSubmit)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="mt-6 space-y-4 border-t border-stone-100 pt-6 text-sm text-[#594735]">
          <div className="flex items-center gap-3">
            <Mail className="text-[#b57a2d]" size={18} />
            <span>{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center gap-3">
              <Phone className="text-[#b57a2d]" size={18} />
              <span>{user.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Globe2 className="text-[#b57a2d]" size={18} />
            <span>{user.location || "Tourist Member"}</span>
          </div>
          {user.bio && (
            <p className="rounded-2xl bg-[#fffaf0] p-3 text-xs text-[#6d5c4a]">{user.bio}</p>
          )}
        </div>
      )}
    </section>
  );
}

export default TouristProfileSidebar;
