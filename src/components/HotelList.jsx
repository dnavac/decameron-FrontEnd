import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

/**
 * Componente principal para visualizar la lista de hoteles.
 * 
 * Este componente se encarga de:
 * 1. Hacer una petición GET a la API para obtener todos los hoteles.
 * 2. Manejar el estado de carga (loading) para dar retroalimentación visual al instante mediante skeletons.
 * 3. Renderizar una cuadrícula (grid) de tarjetas con la información de los hoteles o un estado vacío.
 */
export default function HotelList() {
    // Estado para almacenar la lista de hoteles
    const [hotels, setHotels] = useState([]);

    // Estado para manejar la carga inicial, lo inicializamos en true para mostrar esqueletos
    const [loading, setLoading] = useState(true);

    // Efecto secundario que se ejecuta una vez al montar el componente
    useEffect(() => {
        api.get('/hotels')
            .then(res => {
                setHotels(res.data);
                setLoading(false); // Ocultar esqueletos cuando la data llega
            })
            .catch(err => {
                console.error("Error al cargar hoteles:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Cabecera principal de la vista */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mis Hoteles</h1>
                    <p className="mt-2 text-sm text-gray-600">Gestiona y administra todas tus propiedades desde aquí.</p>
                </div>
                <Link to="/nuevo-hotel" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Añadir Hotel
                </Link>
            </div>

            {loading ? (
                /* Estado de carga: Muestra un grid de 6 tarjetas tipo 'skeleton' con animaciones */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : hotels.length > 0 ? (
                /* Estado con datos: Renderiza la lista real de hoteles en formato de tarjetas */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotels.map(hotel => (
                        <div key={hotel.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-5">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1" title={hotel.name}>
                                        {hotel.name}
                                    </h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Activo
                                    </span>
                                </div>

                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <svg className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        <span className="truncate" title={hotel.city}>{hotel.city}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
                                        <span>NIT: {hotel.nit}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                        <span>Capacidad: <span className="font-semibold text-gray-900">{hotel.max_rooms}</span> hab.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sección de acciones en la parte inferior de la tarjeta */}
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
                                <Link
                                    to={`/hoteles/${hotel.id}/habitaciones`}
                                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Configurar Habitaciones
                                    <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Estado vacío: Cuando la API responde con éxito pero no hay registros */
                <div className="text-center bg-white rounded-2xl p-12 border-2 border-dashed border-gray-300">
                    <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    <h3 className="mt-2 text-xl font-medium text-gray-900">Aún no tienes hoteles</h3>
                    <p className="mt-2 text-gray-500 max-w-sm mx-auto">Lo siento, parece que el sistema está vacío. Comienza añadiendo tu primer hotel para administrar sus habitaciones.</p>
                    <div className="mt-8">
                        <Link to="/nuevo-hotel" className="inline-flex items-center px-6 py-3 border border-transparent shadow text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                            + Añadir mi primer hotel
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}