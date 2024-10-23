import { connectToDB } from "@utils/database";
import User from "@models/user";

export const POST = async (req) => {
  const { userId, username, displayName } = await req.json();

  try {
    await connectToDB();

    // Check if username is already taken
    const existingUser = await User.findOne({ username, _id: { $ne: userId } });
    if (existingUser) {
      return new Response("Username is already taken", { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, displayName },
      { new: true }
    );

    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to update user", { status: 500 });
  }
};
