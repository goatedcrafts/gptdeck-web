"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ProfileCompletionForm from "./ProfileCompletionForm";

const ProfileCompletionCheck = ({ children }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (session && !session.user.isProfileComplete) {
    return <ProfileCompletionForm />;
  }

  return children;
};

export default ProfileCompletionCheck;
