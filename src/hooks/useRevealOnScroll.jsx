import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function useRevealOnScroll(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      element.classList.add('visible')
      gsap.fromTo(
        element,
        { opacity: 0, y: options.y || 45, scale: options.scale || 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration || 0.9,
          delay: options.delay || 0,
          ease: options.ease || 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: options.start || 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [options])

  return ref
}

export default useRevealOnScroll
