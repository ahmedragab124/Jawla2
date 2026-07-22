import { useEffect, useState, useRef } from 'react';
import PopCard from './PopCard';
import { supabase } from '../../../supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PopularSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const loadAttractions = async () => {
      const { data, error } = await supabase.from('attractions').select('*');

      if (error) {
        console.error('Failed to load attractions:', error);
        return;
      }

      setAttractions(data || []);
    };

    loadAttractions();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="fesecte-section bg-gradient-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-24 overflow-hidden">
      <div ref={titleRef} className="mx-auto max-w-4xl px-4 text-center">
        <span className="text-xs font-black tracking-[0.25em] text-[#b57a2d] uppercase">Must Visit Places</span>
        <h2 className="mt-2 text-4xl md:text-5xl font-black text-[#3f2b1a] tracking-tight">Our Popular Attractions</h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d]" />
        <p className="mt-6 text-base md:text-lg leading-8 text-[#5b4423] max-w-2xl mx-auto">
          Explore our most sought-after travel experiences, featuring iconic landmarks and hidden gems across the region.
        </p>
      </div>

      <PopCard attractions={attractions} />
    </section>
  );
}

export default PopularSection;
