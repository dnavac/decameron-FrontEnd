import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function HotelCreate() {
    //Hooks de navegación para redirección
    const navigate = useNavigate();
    //Hooks de estado para manejar el formulario y la carga
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', address: '', city: '', nit: '', max_rooms: '' });

    //Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        //cambia el estado de loading a true cuando se envía el formulario
        setLoading(true);
        //Se conecta a la API y crea el hotel
        try {
            await api.post('/hotels', form);
            toast.success('Hotel creado exitosamente');
            //Redirecciona a la página principal
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al crear el hotel');
        } finally {
            //finalmente cambia el estado de loading a false
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
                {/* Cabecera con botón de Volver */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Registrar Nuevo Hotel</h2>
                    <Link
                        to="/"
                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold border border-blue-600 px-3 py-1 rounded transition"
                    >
                        Volver
                    </Link>
                </div>
                {/* Formulario para crear el hotel*/}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campos del formulario con enlace al estado*/}
                    {/* Campos del formulario con enlace al estado*/}
                    <input required className="w-full p-2 border rounded" placeholder="Nombre" onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input required className="w-full p-2 border rounded" placeholder="Dirección" onChange={e => setForm({ ...form, address: e.target.value })} />
                    <input required className="w-full p-2 border rounded" placeholder="Ciudad" onChange={e => setForm({ ...form, city: e.target.value })} />
                    <input required className="w-full p-2 border rounded" placeholder="NIT" onChange={e => setForm({ ...form, nit: e.target.value })} />
                    <input type="number" required className="w-full p-2 border rounded" placeholder="Máximo de habitaciones" onChange={e => setForm({ ...form, max_rooms: e.target.value })} />

                    {/* Botón de enviar*/}
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 transition"
                    >
                        {loading ? 'Guardando...' : 'Guardar Hotel'}
                    </button>
                </form>
            </div>
        </div>
    );
}