import React, { useEffect, useState } from "react";
import { getProfiles } from "../app/utils";
import { Perfil } from "@/app/modelo";
import CardProfile from "./cardProfile";

const GridProfile: React.FC = () => {
  const [profiles, setProfiles] = useState<Perfil[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profiles = await getProfiles();
        setProfiles(profiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center ">
    {profiles.map((profile) => (
      <CardProfile key={profile.id} profileId={profile.id} />
    ))}
  </div>
  );
};

export default GridProfile;
