/**
 * ExperienceCard Component
 * Modern glassmorphic experience card for the destinations experience carousel.
 * 
 * @param {Object} props
 * @param {Object} props.place - Experience details object
 */
function ExperienceCard({ place }) {
  return (
    <div className="experience-card snap-center shrink-0 w-[290px] sm:w-[325px] h-[440px] relative overflow-hidden rounded-[32px] border border-[#f0dfcc]/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] group cursor-pointer transition-all duration-500 ease-out">
      {/* Background Image with smooth hover scale */}
      <img
        src={place.image}
        alt={place.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        onError={(e) => { e.currentTarget.src = '/attractions/pyramids.png'; }}
      />
      
      {/* Premium dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

      {/* Floating Category Tag */}
      <span className="absolute top-5 left-5 z-20 rounded-full bg-amber-500/90 backdrop-blur-md px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
        {place.category}
      </span>

      {/* Premium Glassmorphic content box */}
      <div className="absolute bottom-5 inset-x-5 z-10 p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md shadow-lg flex flex-col justify-end text-white text-left transition-all duration-500 group-hover:bg-slate-950/60 group-hover:border-white/20">
        <h3 className="text-xl font-black leading-tight tracking-tight drop-shadow-md text-amber-100 group-hover:text-white transition-colors duration-300">
          {place.title}
        </h3>
        <p className="mt-2.5 text-[11px] leading-5 text-stone-200 line-clamp-3 font-medium opacity-90 group-hover:opacity-100 transition-opacity">
          {place.description}
        </p>
      </div>
    </div>
  );
}

export default ExperienceCard;
