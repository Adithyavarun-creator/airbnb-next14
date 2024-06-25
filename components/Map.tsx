"use client"

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCountries } from '@/app/lib/getCountries'
import { icon } from 'leaflet'


const ICON = icon({
    iconUrl: "https://cdn3.iconfinder.com/data/icons/pin-4/100/pin-512.png",
    iconSize: [50, 50]
})

const Map = ({ location }: {
    location: string
}) => {
    const { getCountryByValue } = useCountries()

    const latLong = getCountryByValue(location)?.latLang
    return (
        <MapContainer
            scrollWheelZoom={false}
            className='h-[50vh] rounded-lg relative z-0'
            center={latLong ?? [52.505, -0.09]}
            zoom={13}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                icon={ICON}
                position={latLong ?? [52.505, -0.09]} />
        </MapContainer>
    )
}

export default Map