import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, homeForRole } from "../context/AuthContext";
import { toast } from "react-toastify";
import { supabase } from "../../../supabase";
import AuthFormFields from "../components/AuthFormFields";
import { Compass, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import gsap from "gsap";

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "Tourist",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const cardRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleTabChange = (newMode) => {
    setMode(newMode);
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  };

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setRole = (roleName) => {
    setForm((prev) => ({ ...prev, role: roleName }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (mode === "signup" && !form.name)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (mode === "signup" && form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: users, error: usersError } = await supabase
        .from("users")
        .select("*");
      if (usersError) throw usersError;

      if (mode === "login") {
        const user = users.find(
          (u) => u.email === form.email && u.password === form.password
        );
        if (!user) {
          toast.error("Invalid email or password.");
          setIsSubmitting(false);
          return;
        }
        login(user);
        toast.success(`Welcome back, ${user.name}!`);
        navigate(homeForRole(user.role));
        return;
      }

      if (users.some((u) => u.email === form.email)) {
        toast.error("This email is already registered.");
        setIsSubmitting(false);
        return;
      }

      const id =
        Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
      const newUser = {
        id,
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      const { data: createdUser, error: createError } = await supabase
        .from("users")
        .insert(newUser)
        .select()
        .single();
      if (createError) throw createError;

      if (form.role === "Tour Guide") {
        const guideId =
          Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
        await supabase.from("tourGuides").insert({
          id: guideId,
          userId: createdUser.id,
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone || "",
          whatsapp: form.phone || "",
          status: "Pending approval",
        });
      }

      login(createdUser);
      navigate("/profile");
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(
        error.message || "Could not connect to Supabase. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#271b12] via-[#1a110a] to-[#120a05] px-4 pt-28 pb-20 flex items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#b57a2d]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#3f2b1a]/40 blur-3xl pointer-events-none" />

      <section
        ref={cardRef}
        className="relative z-10 w-full max-w-lg rounded-[36px] bg-white/95 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/40 space-y-6"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <img
              src="/favicon.svg"
              alt="Jawla Logo"
              className="h-10 w-10 object-contain group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="text-2xl font-black tracking-wide text-[#3f2b1a]">
              Jawla
            </span>
          </Link>

          <h1 className="text-3xl font-black text-[#3f2b1a] tracking-tight">
            {mode === "login" ? "Welcome Back" : "Start Your Journey"}
          </h1>
          <p className="text-xs text-[#695744] font-medium max-w-xs mx-auto">
            {mode === "login"
              ? "Log in to access your saved trips and guide bookings."
              : "Create an account to explore Egypt's hidden wonders."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 rounded-2xl bg-[#f4ebd9] p-1.5 shadow-inner">
          <button
            type="button"
            onClick={() => handleTabChange("login")}
            className={`rounded-xl py-2.5 text-xs font-black transition-all duration-300 cursor-pointer ${
              mode === "login"
                ? "bg-white text-[#3f2b1a] shadow-md scale-[1.02]"
                : "text-[#806c56] hover:text-[#3f2b1a]"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("signup")}
            className={`rounded-xl py-2.5 text-xs font-black transition-all duration-300 cursor-pointer ${
              mode === "signup"
                ? "bg-white text-[#3f2b1a] shadow-md scale-[1.02]"
                : "text-[#806c56] hover:text-[#3f2b1a]"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Form */}
        <form ref={formRef} className="space-y-5 pt-1" onSubmit={submit}>
          <AuthFormFields
            mode={mode}
            form={form}
            onChange={updateField}
            onSelectRole={setRole}
          />

          <button
            disabled={isSubmitting}
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#b57a2d] to-[#9b6525] py-4 text-sm font-black text-white shadow-xl shadow-[#b57a2d]/30 transition-all duration-300 hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting
                ? "Processing..."
                : mode === "login"
                ? "Log In to Jawla"
                : "Create Free Account"}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </button>
        </form>
      </section>
    </main>
  );
}

export default AuthPage;
