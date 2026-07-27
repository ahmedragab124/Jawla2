import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Background from "../features/destinations/components/Background";
import HeroContent from "../features/destinations/components/HeroContent";
import ExperienceSection from "../features/destinations/components/ExperienceSection";
import GuideSection from "../features/destinations/components/GuideSection";
import { supabase } from "../supabase";

function DestinationPage() {
  const [destination, setDestination] = useState(null);
  const params = useParams();
  // console.log(destination);

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

  // console.log(destination);

  if (!destination?.heroImage) {
    return (
      <main className="grid min-h-[70vh] place-items-center text-xl text-[#7a5540]">
        Loading...
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
