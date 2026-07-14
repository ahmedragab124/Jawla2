import { useEffect, useRef } from 'react'

function useRevealOnScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('visible')
          observer.disconnect()
        }
      },
      {
        threshold: 0.05,
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}

export default useRevealOnScroll
