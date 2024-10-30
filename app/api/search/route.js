import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("q");
  const searchType = searchParams.get("type"); // 'tag' or 'username'

  try {
    await connectToDB();

    let searchCriteria = {};

    if (searchType === "tag") {
      searchCriteria = {
        tag: { $regex: searchQuery, $options: "i" },
      };
    } else if (searchType === "username") {
      // Look up prompts where the creator's username matches the search query
      const prompts = await Prompt.aggregate([
        {
          $lookup: {
            from: "users", // The name of your users collection
            localField: "creator",
            foreignField: "_id",
            as: "creator",
          },
        },
        {
          $unwind: "$creator",
        },
        {
          $match: {
            "creator.username": { $regex: searchQuery, $options: "i" },
          },
        },
      ]);

      return new Response(JSON.stringify(prompts), { status: 200 });
    } else {
      // Search both tags and usernames
      const prompts = await Prompt.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "creator",
            foreignField: "_id",
            as: "creator",
          },
        },
        {
          $unwind: "$creator",
        },
        {
          $match: {
            $or: [
              { tag: { $regex: searchQuery, $options: "i" } },
              { "creator.username": { $regex: searchQuery, $options: "i" } },
            ],
          },
        },
      ]);

      return new Response(JSON.stringify(prompts), { status: 200 });
    }

    // If searching by tag only
    const prompts = await Prompt.find(searchCriteria).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
