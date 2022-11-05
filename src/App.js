import Home from "./components/Home/Home";
import Anime from "./components/Anime/Anime";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime" element={<Anime />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
