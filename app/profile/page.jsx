"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  console.log("from profile: " + session?.user.id);

  useEffect(() => {
    const fetchPost = async () => {
      if (session?.user.id) {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await response.json();
        console.log("from useEffect: " + data);

        setPosts(data);
      }
    };

    if (session?.user.id) fetchPost();
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async () => {};

  return (
    <Profile
      name="anjal"
      desc="welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
