import Feed from "@components/Feed";
import { Cover } from "@components/ui/cover";
import { WavyBackground } from "@components/ui/wavy-background";

const Home = () => {
  return (
    // <section className="w-full flex-center flex-col">
    //   <h1 className="head_text text-center">
    //     Discover & Share
    //     <br className="max-md:hidden" />
    //     <span className="orange_gradient"> AI-Powered Prompts</span>
    //   </h1>
    //   <p className="desc text-center">
    //     PromptPedia is an open-source AI prompting tool for modern world to
    //     discover, create and share creative prompts
    //   </p>

    //   <Feed />
    // </section>
    <section className="w-full flex-center flex-col px-32">
      <WavyBackground className="mx-auto pb-40">
        <h1 className="mt-5 text-md font-extrabold leading-[1.15] md:text-5xl text-center text-white">
          Explore & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient"> Inspiring GPT Prompts</span>
        </h1>
        <p className="mt-5 text-lg text-white/50 sm:text-xl max-w-2xl text-center">
          GPTDeck is your go-to platform to discover, create, and share powerful
          GPT prompts with a community of AI enthusiasts.
        </p>
      </WavyBackground>
      <Feed className="" />
    </section>
  );
};

export default Home;
