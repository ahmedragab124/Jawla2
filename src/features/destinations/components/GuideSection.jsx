import { useEffect, useRef } from "react";
import { FaRegCalendarCheck, FaShieldAlt } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/GuideSection.css";

function GuideSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("show");
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="guide-section">
      <div className="guide-content">
        <div className="guide-text">
          <h2>Unveil Secrets with a Local Expert</h2>

          <p className="guide-description">
            Don't just see the monuments—understand them. Our certified
            Egyptologists bring the ancient world to life with stories of
            intrigue, mystery, and the daily lives of the pharaohs.
          </p>

          <div className="guide-features">
            <div className="feature">
              <div className="icon">
                <FaShieldAlt />
              </div>
              <span>Certified Private Egyptologists</span>
            </div>

            <div className="feature">
              <div className="icon">
                <FaRegCalendarCheck />
              </div>
              <span>Flexible, Personalized Itineraries</span>
            </div>

            <div className="feature">
              <div className="icon">
                <MdTranslate />
              </div>
              <span>Multi-lingual support (EN/AR/FR/DE)</span>
            </div>
          </div>

          <Link to="/booking" className="guide-btn">
            Book a Local Guide
          </Link>
        </div>

        <div className="guide-image">
          <div className="image-wrapper">
            <img src="/destinations/guide.png" alt="Local guide" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuideSection;
