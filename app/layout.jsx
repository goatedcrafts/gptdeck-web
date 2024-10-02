import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "gptdeck",
  discription: "share ur prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Provider>
          <div className="">
            <div className="" />
          </div>

          <main className="max-w-7xl mx-auto sm:px-16">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
