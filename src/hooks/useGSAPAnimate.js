import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Reusable GSAP hook for scroll animations and stagger reveals
export function useGSAPAnimate(options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current
      if (!container) return

      const {
        type = 'fadeUp',
        target = container,
        stagger = 0.12,
        duration = 0.8,
        delay = 0,
        distance = 40,
        ease = 'power3.out',
        start = 'top 85%',
        once = true,
      } = options

      const targets = typeof target === 'string' ? container.querySelectorAll(target) : [container]
      if (!targets.length) return

      let fromVars = { opacity: 0 }
      let toVars = {
        opacity: 1,
        duration,
        delay,
        ease,
        stagger: targets.length > 1 ? stagger : 0,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      }

      switch (type) {
        case 'fadeUp':
          fromVars.y = distance
          toVars.y = 0
          break
        case 'fadeDown':
          fromVars.y = -distance
          toVars.y = 0
          break
        case 'fadeLeft':
          fromVars.x = -distance
          toVars.x = 0
          break
        case 'fadeRight':
          fromVars.x = distance
          toVars.x = 0
          break
        case 'scaleUp':
          fromVars.scale = 0.85
          toVars.scale = 1
          break
        case 'staggerCards':
          fromVars.y = distance + 10
          fromVars.scale = 0.95
          toVars.y = 0
          toVars.scale = 1
          break
        default:
          fromVars.y = distance
          toVars.y = 0
      }

      gsap.fromTo(targets, fromVars, toVars)
    }, containerRef)

    return () => ctx.revert()
  }, [options])

  return containerRef
}

export default useGSAPAnimate
