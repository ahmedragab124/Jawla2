import { useEffect, useRef } from "react";
import { FaRegCalendarCheck, FaShieldAlt } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { Link } from "react-router-dom";
import "./GuideSection.css";

function GuideSection({ destination }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("show");
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="guide-section">
      <div className="guide-content">
        <div className="guide-text">
          <h2>
            {destination.guideTitle}
          </h2>

          <p className="guide-description">
            {destination.guideDescription}
          </p>

          <div className="guide-features">
            {destination.guideFeatures.map((feature, index) => {
              const Icon = [FaShieldAlt, FaRegCalendarCheck, MdTranslate][index] || FaShieldAlt;
              return (
                <div className="feature" key={feature}>
                  <div className="icon"><Icon /></div>
                  <span>{feature}</span>
                </div>
              );
            })}
          </div>

          <Link to="/booking" className="guide-btn">
            Book a Local Guide
          </Link>
        </div>

        <div className="guide-image">
          <div className="image-wrapper">
            <img src={destination.guideImage} alt={`${destination.name} local guide`} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuideSection;
