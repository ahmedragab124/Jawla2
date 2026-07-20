import ExperienceCard from "./ExperienceCard";
import { useState, useEffect, useRef } from "react";
import "../styles/ExperienceSection.css";

function ExperienceSection({ destination }) {
  const places = destination.experiences || [];
  const categories = ["All", ...new Set(places.map((place) => place.category))];

  const [filter, setFilter] = useState("All");
  const sectionRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const filteredPlaces =
    filter === "All"
      ? places
      : places.filter((place) => place.category === filter);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowAnimation(true);
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="experience-section">
      <div className="experience-header">
        <span className="section-tag">{destination.exploreLabel}</span>

        <h2>{destination.experienceTitle}</h2>

        <p>{destination.experienceDescription}</p>
      </div>

      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={filter === category ? "active" : ""}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filter === "All" ? (
        <div
          key={filter}
          className={`cards-container ${showAnimation ? "fade-animation" : ""}`}
        >
          {places[0] && <ExperienceCard place={places[0]} large />}
          <div className="right-cards">
            {places.slice(1).map((place) => (
              <ExperienceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      ) : (
      <div
  key={filter}
  className={`cards-container ${
    showAnimation ? "fade-animation" : ""
  }`}
>
          {filteredPlaces.map((place) => (
            <ExperienceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ExperienceSection;
