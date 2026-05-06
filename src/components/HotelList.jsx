import { useEffect, useState } from 'react';
import api from '../services/api';

export default function HotelList() {
    //Hooks para guardar hoteles
    const [hotels, setHotels] = useState([]);

    //Hook para obtener hoteles
    useEffect(() => {
        api.get('/hotels').then(res => setHotels(res.data)).catch(err => console.error("Error al cargar hoteles:", err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Hoteles Registrados</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Nuevo Hotel
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 border text-left">Nombre</th>
                            <th className="px-4 py-3 border text-left">Ciudad</th>
                            <th className="px-4 py-3 border text-left">NIT</th>
                            <th className="px-4 py-3 border text-center">Max. Hab.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.length > 0 ? hotels.map(hotel => (
                            <tr key={hotel.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{hotel.name}</td>
                                <td className="px-4 py-2 border">{hotel.city}</td>
                                <td className="px-4 py-2 border">{hotel.nit}</td>
                                <td className="px-4 py-2 border text-center">{hotel.max_rooms}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" className="text-center py-4">No hay hoteles registrados</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}