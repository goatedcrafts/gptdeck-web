import Feed from "@components/Feed";
import Hero from "@components/Hero";

export const revalidate = 0; // This ensures the page is not cached

async function fetchPosts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompt`,
    { cache: "no-store" }
  );
  const posts = await response.json();
  return posts;
}

export default async function Home() {
  const initialPosts = await fetchPosts();

  return (
    <>
      <Hero />
      <Feed initialPosts={initialPosts} />
    </>
  );
}
