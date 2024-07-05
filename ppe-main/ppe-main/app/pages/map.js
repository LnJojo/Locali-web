import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { createClient } from "@supabase/supabase-js";
import { supabase } from './api/supabase'
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const supabaseUrl = 'https://ulyegzjugeundkwapdac.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseWVnemp1Z2V1bmRrd2FwZGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEwMjY0MTgsImV4cCI6MTk4NjYwMjQxOH0.IA6Uk7vw4LKMjrMz76uHC0TV_a9XGWex7huwSP_o7zQ"




//pk.eyJ1IjoibG5qb2pvIiwiYSI6ImNsZXNmbmcxZDBqNGgzcW4xaHFrZmt1cTEifQ.NVkIwxQPP6aTnaDpqTq1SA

const TOKEN = 'pk.eyJ1IjoibG5qb2pvIiwiYSI6ImNsZXNmbmcxZDBqNGgzcW4xaHFrZmt1cTEifQ.NVkIwxQPP6aTnaDpqTq1SA';

export default function MyMap() {

    const supabase = createClient(supabaseUrl, supabaseKey);

    const [viewport, setViewport] = useState({});
    const [marker, setMarker] = useState(null);
    const [magasins, setMagasins] = useState([]);

    useEffect(() => {
        const success = (pos) => {
            const { latitude, longitude } = pos.coords;
            setViewport({
                ...viewport,
                latitude,
                longitude,
                zoom: 12,
            });
            setMarker({
                latitude,
                longitude
            });
        };
        const error = (err) => {
            console.error(`Error: ${err.message}`);
        };
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    useEffect(() => {
        const fetchMagasins = async () => {
            let { data, error } = await supabase.from('commercants').select('*');
            if (error) console.log('Error fetching magasins:', error.message);
            else {
                console.log(data);
                setMagasins(data);
                console.log(magasins);
            }
        };
        fetchMagasins();
    }, []);

    const pins = useMemo(
        () =>
            magasins.length > 0 && magasins.map((shop, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={shop.longitude}
                    latitude={shop.latitude}
                    anchor="bottom"
                    onClick={e => {
                        // If we let the click event propagates to the map, it will immediately close the popup
                        // with `closeOnClick: true`
                        e.originalEvent.stopPropagation();
                        setMarker(shop);
                    }}
                >
                </Marker>
            )),
        [magasins]
    );

    return (
        <>

            <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet"></link>
            <div className='boxMap'>
                <Map
                    // Utilisez `viewport` au lieu de `initialViewState`
                    viewport={viewport}
                    onViewportChange={(Viewport) => setViewport(Viewport)}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={TOKEN} // Utilisez `mapboxApiAccessToken` au lieu de `mapboxAccessToken`
                >
                    <GeolocateControl position="top-left"
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                        showAccuracyCircle={false}
                    />

                    <FullscreenControl position="top-left" />
                    <NavigationControl position="top-left" />
                    <ScaleControl />

                    {pins}

                    {marker && (
                        <Popup
                            anchor="top"
                            longitude={Number(marker.longitude)}
                            latitude={Number(marker.latitude)}
                            adresse={Number(marker.adresse)}
                            onClose={() => setMarker(null)}
                        >
                            <div className='popupMarker'>
                                {marker.nom}, {marker.adresse} | {' '} <br></br>
                                {marker.site && (
                                    <a
                                        target="_new"
                                        href={marker.site}

                                    >
                                        Site internet
                                    </a>
                                )

                                }

                            </div>
                        </Popup>
                    )}

                </Map>
            </div>

        </>

    );
}