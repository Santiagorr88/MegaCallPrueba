import { useEffect, useState } from "react";
import { AuthProvider } from "./context/UserContext";
import { Auth } from "./pages/Auth/Auth";
import { Navigation } from "./routes/Navigation";
function App() {
  const [token, setToken] = useState(undefined);
  useEffect(() => {
    getTokenLocalStorage();
  }, []);

  const TOKEN = "token";

  const getTokenLocalStorage = () => {
    const tokenLocal = localStorage.getItem(TOKEN);
    setToken(tokenLocal);
  };

  return (
    <AuthProvider>
      {!token ? <Auth setToken={setToken} /> : <Navigation />}
    </AuthProvider>
  );
}

export default App;
