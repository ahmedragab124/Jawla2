
import { Link } from 'react-router-dom'

function PopCardItem({ attraction }) {
  return (
    <Link to={`/attractions/${attraction.id}`} className="popcartitem relative block max-w-[20rem] overflow-hidden rounded-[28px] border border-[#e6e8ec] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,0.18)] hover:z-10">
      <img
        src={attraction.image}
        alt={attraction.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold text-[#101828]">{attraction.name}</h2>
          </div>
          <span className="inline-flex items-center rounded-full bg-[#f8f6f0] px-2.5 py-1 text-[11px] font-semibold text-[#b57a2d]  ">
           {attraction.star}
           <span className='pl-2'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
            </svg>
           </span>

          </span>
        </div>

        <p className="text-xs leading-5 text-[#475467] min-h-14">
          {attraction.description}
        </p>

        <span className="block w-full rounded-3xl border border-[#4062b3] bg-white px-4 py-2 text-center text-xs font-semibold text-[#4062b3] transition hover:bg-[#eff4ff]">
          View Details
        </span>
      </div>
    </Link>
  )
}

export default PopCardItem
