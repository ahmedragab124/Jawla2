import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Background from "../features/destinations/components/Background";
import HeroContent from "../features/destinations/components/HeroContent";
import ExperienceSection from "../features/destinations/components/ExperienceSection";
import GuideSection from "../features/destinations/components/GuideSection";
import { DetailsPageSkeleton } from "../shared/components/ui/Skeleton";
import { supabase } from "../supabase";

function DestinationPage() {
  const [destination, setDestination] = useState(null);
  const params = useParams();

  React.useEffect(() => {
    const loadDestination = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        toast.error("Failed to load destination");
        return;
      }

      setDestination(data);
    };

    loadDestination();
  }, [params.id]);

  if (!destination?.heroImage) {
    return (
      <main className="min-h-screen bg-[#fffaf0] px-5 pt-28 pb-16">
        <div className="mx-auto max-w-6xl">
          <DetailsPageSkeleton />
        </div>
      </main>
    );
  }

  return (
    <>
      <Background image={destination.heroImage}>
        <HeroContent destination={destination} />
      </Background>
      <ExperienceSection destination={destination} />
      <GuideSection />
    </>
  );
}

export default DestinationPage;
