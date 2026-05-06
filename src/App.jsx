import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HotelList from './components/HotelList';
import { Toaster } from 'react-hot-toast';
import HotelCreate from './components/HotelCreate';
import RoomConfig from './components/RoomConfig';
function App() {
  return (
    //Componente BrowserRouter para el manejo de rutas
    <BrowserRouter>
      {/*Componente Toaster para notificaciones*/}
      <Toaster position="top-right" reverseOrder={false} />
      {/*Componente Container para manejo de la pantalla*/}
      <div className='container mx-auto p-4'>
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/nuevo-hotel" element={<HotelCreate />} />
          <Route path="/hoteles/:id/habitaciones" element={<RoomConfig />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;