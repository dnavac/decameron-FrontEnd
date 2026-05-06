import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

/**
 * Componente RoomConfig: Administra las habitaciones asignadas a un hotel.
 * Demuestra el manejo de estados dependientes y validación de reglas de negocio.
 */
export default function RoomConfig() {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Estado del formulario
    const [form, setForm] = useState({
        quantity: '',
        type: '',
        accommodation: ''
    });

    // Opciones de configuración según las reglas del negocio (PDF)
    const roomConfigRules = {
        'ESTANDAR': ['SENCILLA', 'DOBLE'],
        'JUNIOR': ['TRIPLE', 'CUADRUPLE'],
        'SUITE': ['SENCILLA', 'DOBLE', 'TRIPLE']
    };

    // Cargar los datos del hotel al montar el componente
    useEffect(() => {
        fetchHotelData(true);
    }, [id]);

    const fetchHotelData = async (isInitialLoad = false) => {
        try {
            if (isInitialLoad) setLoading(true);
            // Suponemos que el endpoint GET /hotels/:id retorna el hotel con sus habitaciones (relación)
            const res = await api.get(`/hotels/${id}`);
            setHotel(res.data);
        } catch (error) {
            toast.error("Error al cargar la información del hotel");
            console.error(error);
        } finally {
            if (isInitialLoad) setLoading(false);
        }
    };

    // Manejar cambio en el tipo de habitación para resetear la acomodación si ya no es válida
    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setForm({
            ...form,
            type: selectedType,
            // Reseteamos la acomodación automáticamente al cambiar el tipo
            accommodation: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de reglas de negocio en frontend
        if (!roomConfigRules[form.type]?.includes(form.accommodation)) {
            toast.error("La acomodación seleccionada no es válida para este tipo de habitación.");
            return;
        }

        setSubmitting(true);
        try {
            await api.post(`/hotels/${id}/rooms`, {
                quantity: parseInt(form.quantity),
                room_type: form.type,
                accommodation: form.accommodation
            });

            toast.success('Configuración guardada exitosamente');
            // Limpiar formulario y recargar datos para mostrar la nueva lista
            setForm({ quantity: '', type: '', accommodation: '' });
            fetchHotelData();

        } catch (err) {
            const errorMessage =
                err.response?.data?.error ||
                err.response?.data?.message
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Cargando datos del hotel...</div>;
    }

    if (!hotel) {
        return <div className="text-center mt-10">Hotel no encontrado.</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Cabecera y Navegación */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Configurar Habitaciones</h1>
                    <p className="mt-2 text-gray-600">
                        Hotel: <span className="font-semibold text-blue-600">{hotel.name}</span> | Max. Habitaciones: <span className="font-semibold text-blue-600">{hotel.max_rooms}</span>
                    </p>
                </div>
                <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold border border-blue-600 px-4 py-2 rounded-lg transition-colors">
                    &larr; Volver a la Lista
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Formulario de Configuración */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Nueva Configuración</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                                <input
                                    type="number"
                                    min="1"
                                    required
                                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ej. 10"
                                    value={form.quantity}
                                    onChange={e => setForm({ ...form, quantity: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Habitación</label>
                                <select
                                    required
                                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    value={form.type}
                                    onChange={handleTypeChange}
                                >
                                    <option value="" disabled>Seleccione un tipo</option>
                                    {Object.keys(roomConfigRules).map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Acomodación</label>
                                <select
                                    required
                                    disabled={!form.type} // Deshabilitado si no hay tipo seleccionado
                                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    value={form.accommodation}
                                    onChange={e => setForm({ ...form, accommodation: e.target.value })}
                                >
                                    <option value="" disabled>Seleccione acomodación</option>
                                    {/* Generar opciones dinámicamente según el tipo seleccionado */}
                                    {form.type && roomConfigRules[form.type].map(acc => (
                                        <option key={acc} value={acc}>{acc}</option>
                                    ))}
                                </select>
                                {!form.type && <p className="text-xs text-gray-500 mt-1">Selecciona primero un tipo de habitación.</p>}
                            </div>

                            <button
                                disabled={submitting}
                                type="submit"
                                className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md disabled:bg-blue-400 mt-6"
                            >
                                {submitting ? 'Guardando...' : 'Asignar Habitaciones'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Tabla/Lista de Habitaciones Actuales */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Habitaciones Configuradas</h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                                        <th className="p-3 font-semibold">Tipo</th>
                                        <th className="p-3 font-semibold">Acomodación</th>
                                        <th className="p-3 font-semibold text-center">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hotel.room_settings && hotel.room_settings.length > 0 ? (
                                        hotel.room_settings.map((setting, idx) => (
                                            <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                                                <td className="p-3 font-medium text-gray-800">{setting.room_type?.name}</td>
                                                <td className="p-3 text-gray-600">{setting.accommodation?.name}</td>
                                                <td className="p-3 text-center">
                                                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                        {setting.quantity}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="p-8 text-center text-gray-500">
                                                No hay habitaciones configuradas para este hotel todavía.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
