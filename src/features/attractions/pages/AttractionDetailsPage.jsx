import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Star, Tag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../../../supabase';
import AttractionInfoGrid from '../components/AttractionInfoGrid';
import useSEO from '../../../hooks/useSEO';
import gsap from 'gsap';

/**
 * AttractionDetailsPage Component
 * Detailed view for an attraction with destination city link and GSAP reveal animations.
 */
function AttractionDetailsPage() {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useSEO({
    title: attraction ? attraction.name : 'Attraction Details',
    description: attraction ? attraction.description : 'Read detailed information, visit guidelines, and best times to travel to this monument.'
  });

  /**
   * Fetches attraction details and associated destination info from Supabase
   */
  useEffect(() => {
    async function loadAttraction() {
      try {
        const { data: attractionData, error: attractionError } = await supabase.from('attractions').select('*').eq('id', id).single();
        if (attractionError) throw attractionError;
        setAttraction(attractionData);

        if (attractionData.destinationId) {
          const { data: destinationData, error: destinationError } = await supabase.from('destinations').select('*').eq('id', attractionData.destinationId).single();
          if (destinationError) throw destinationError;
          setDestination(destinationData);
        }
      } catch (err) {
        console.error(err);
        setError('This attraction could not be found.');
      } finally {
        setLoading(false);
      }
    }

    loadAttraction();
  }, [id]);

  /**
   * Triggers GSAP page entrance timeline animation
   */
  useEffect(() => {
    if (loading || !attraction) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(imageRef.current, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1 })
        .fromTo(contentRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8 }, '-=0.6');
    }, containerRef);

    return () => ctx.revert();
  }, [loading, attraction]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fffaf0] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#b57a2d] border-t-transparent" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#fffaf0] px-5 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#3f2b1a]">{error}</h1>
        <Link to="/attractions" className="mt-5 inline-block font-semibold text-[#b57a2d] hover:underline">
          Back to attractions
        </Link>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#f7ebe0] to-[#fffaf0] px-5 py-10 md:py-16">
      <article className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-2xl border border-[#f3e6d3]">
        <div className="grid lg:grid-cols-2">
          <div className="min-h-96 bg-[#ead8bd] overflow-hidden relative">
            <img
              ref={imageRef}
              src={attraction.image || '/attractions/pyramids.png'}
              alt={attraction.name}
              className="h-full min-h-96 w-full object-cover"
              onError={(e) => { e.currentTarget.src = '/attractions/pyramids.png'; }}
            />
          </div>

          <div ref={contentRef} className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <Link to="/attractions" className="inline-flex items-center gap-2 text-xs font-bold text-[#a9681b] hover:text-[#3f2b1a] transition">
                <ArrowLeft size={16} /> Back to attractions
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff2d9] border border-[#f0dfcc] px-3.5 py-1.5 text-xs font-bold text-[#a9681b]">
                  <Tag size={14} /> {attraction.category}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff2d9] border border-[#f0dfcc] px-3.5 py-1.5 text-xs font-bold text-[#a9681b]">
                  <Star size={14} fill="currentColor" className="text-amber-500" /> {attraction.star}
                </span>
              </div>
              <h1 className="mt-5 text-4xl font-black leading-tight text-[#3f2b1a] md:text-5xl">{attraction.name}</h1>
              <p className="mt-5 text-sm md:text-base leading-8 text-[#685743] font-medium">{attraction.description}</p>

              <AttractionInfoGrid duration={attraction.duration} bestTime={attraction.bestTime} />
            </div>

            {destination && (
              <div className="mt-8 pt-6 border-t border-stone-100">
                <Link
                  to={`/destination/${destination.id}`}
                  className="inline-flex rounded-2xl bg-[#b57a2d] px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#8f5d1e]"
                >
                  Explore {destination.name} City Guide →
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}

export default AttractionDetailsPage;
