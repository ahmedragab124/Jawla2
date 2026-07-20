function ExperienceCard({ place, large }) {
  return (
    <div className={`experience-card ${large ? "large-card" : ""}`}>
      <img src={place.image} alt={place.title} />

      <div className="experience-content">
        <h3>{place.title}</h3>
        <p>{place.description}</p>
      </div>
    </div> 
  );
}

export default ExperienceCard;
