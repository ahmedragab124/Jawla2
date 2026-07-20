import "../styles/HeroContent.css";
import InfoPanel from "./InfoPanel";

function HeroContent({ destination }) {
  return (
    <div className="cairo-hero-content">
      <h1 className="cairo-hero-title">
        {destination.heroTitle}
      </h1>

      <p className="cairo-hero-description">
        {destination.description}
      </p>

      <InfoPanel destination={destination} />

    </div>
  );
}

export default HeroContent;
