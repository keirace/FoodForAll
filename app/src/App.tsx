import Footer from './pages/HomePage/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

function loadGoogleMapsScript(apiKey: string) {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  script.async = true;
  document.body.appendChild(script);
}

function App() {

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (apiKey) {
      loadGoogleMapsScript(apiKey);
    }
  }, []);

  return (
    <>
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export default App;
