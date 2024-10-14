import Image from "next/image";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <div className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            {name}'s Profile
          </span>
        </h1>
        <p className="text-xl text-gray-300">{desc}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
