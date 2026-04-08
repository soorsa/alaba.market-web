import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Providers } from "./hooks/Providers";
import AllRoutes from "./routes/app.routes";
function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Providers>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "10px",
            fontSize: 14,
          },
        }}
      />
      <AllRoutes />
      {/* <NetworkStatusBar /> */}
    </Providers>
  );
}

export default App;
