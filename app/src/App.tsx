import Footer from './pages/HomePage/Footer';
import { Outlet } from 'react-router-dom';


function App() {

  return (
    <>
      <Outlet></Outlet>
      <Footer />      
    </>
  );
}

export default App;
