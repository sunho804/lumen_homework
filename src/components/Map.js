import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Geocode from 'react-geocode';

const containerStyle = {
    width: '900px',
    height: '450px'
  };
Geocode.setApiKey("AIzaSyCJcc3w4QfO8YuBT72HkMqhSAbn--auVYA");

const center = {
    lat: 0,
    lng: -180
  }

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA4eWssVM1ohTxsrP9ghKgBeBadEkwlmd8'
    })

    const [map, setMap] = useState();
    const [position, setPosition] = useState();
    const [address, setAddress] = useState('');
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [city, setCity] = useState('');

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                (response) => {
                    setAddress(response.results[0].formatted_address);
                    for(let i = 0; i < response.results[0].address_components.length; i++) {
                        if(response.results[0].address_components[i].types.includes('locality'))
                            setCity(response.results[0].address_components[i].long_name);
                    }
                },
                (error) => {console.log(error)}
            )
            setPosition({
                "lat": position.coords.latitude,
                "lng": position.coords.longitude
            })
        })
    }

    const onClickMap = (event) => {
        setPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        })
        Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
            (response) => {
                setAddress(response.results[0].formatted_address);
                for(let i = 0; i < response.results[0].address_components.length; i++) {
                    if(response.results[0].address_components[i].types.includes('locality'))
                        setCity(response.results[0].address_components[i].long_name);
                }
            },
            (error) => {console.log(error)}
        )
    }

    const onClickMarker = () => {
        setShowInfoWindow(true);
    }

    useEffect(() => {
        getPosition();
    }, [])

    return isLoaded ? (
        <div>
            <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={5}
            center={position}
            // onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onClickMap}
            >
                <Marker 
                    position={position} 
                    name={address} 
                    onClick={onClickMarker}
                >
                {showInfoWindow && <InfoWindow position={position}><p>{address}</p></InfoWindow>}
                </Marker>
            </GoogleMap>
            <h2>{city}</h2>
        </div>
    ) : <></>
}

export default Map
