"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (session?.user.id) {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
    };

    if (session?.user.id) fetchPost();
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const confirmation = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (confirmation) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <Profile
      name={session?.user.name || "User"}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
