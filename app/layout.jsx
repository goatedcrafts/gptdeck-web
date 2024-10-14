import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "gptdeck",
  discription: "share ur prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-gray-800">
        <Provider>
          <div className="">
            <div className="" />
          </div>

          <main className="">
            {/* <Nav /> */}
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
