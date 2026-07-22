import HeroSection from '../features/landing/components/HeroSection';
import FeatureSection from '../features/landing/components/FeatureSection';
import PopularSection from '../features/landing/components/PopularSection';
import PlannerSection from '../features/landing/components/PlannerSection';
import GuideSection from '../features/landing/components/GuideSection';
import useSEO from '../hooks/useSEO';

// LandingPage Component
// Main landing page with hero, features, popular attractions, AI planner CTA and guide booking sections.
function LandingPage() {
  useSEO({
    title: 'Home',
    description: 'Welcome to Jawla. Explore Egypt\'s rich history, book certified Egyptologists, and generate personalized daily travel schedules with our smart AI Trip Planner.'
  });

  return (
    <>
      <HeroSection />
      <FeatureSection />
      <PopularSection />
      <PlannerSection />
      <GuideSection />
    </>
  );
}

export default LandingPage;
