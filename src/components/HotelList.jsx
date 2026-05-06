import { useEffect, useState } from 'react';
import api from '../services/api';

export default function HotelList() {
    //Hooks para guardar hoteles
    const [hotels, setHotels] = useState([]);

    //Hook para obtener hoteles
    useEffect(() => {
        api.get('/hotels').then(res => setHotels(res.data));
    }, []);

}