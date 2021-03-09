import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Select, MenuItem } from '@material-ui/core';

const containerStyle = {
    width: '100%',
    height: '450px'
  };
Geocode.setApiKey("AIzaSyCJcc3w4QfO8YuBT72HkMqhSAbn--auVYA");

const center = {
    lat: 0,
    lng: -180
  }

function Map(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA4eWssVM1ohTxsrP9ghKgBeBadEkwlmd8'
    })

    const [map, setMap] = useState();
    const [position, setPosition] = useState();
    const [address, setAddress] = useState('');
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [city, setCity] = useState('');
    const [landmarks, setLandmarks] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [infoText, setInfoText] = useState();

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        setSelectedLocation(e.target.value);
        props.onLocationChange(e.target.value);
        setOpen(false);
        setInfoText("You selected landmark \"" + e.target.value + "\"!");
    }

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
                        if(response.results[0].address_components[i].types.includes('locality')) {
                            setCity(response.results[0].address_components[i].long_name);
                        }
                        setInfoText("The selected address is " + response.results[0].formatted_address);
                    }
                },
                (error) => {console.log(error)}
            )
            getLandMarks(position.coords.latitude, position.coords.longitude);
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
                console.log(response.results[0].address_components);
                for(let i = 0; i < response.results[0].address_components.length; i++) {
                    if(response.results[0].address_components[i].types.includes('locality')) {
                        setCity(response.results[0].address_components[i].long_name);
                    }
                    setInfoText("The selected address is " + response.results[0].formatted_address);
                }
            },
            (error) => {console.log(error)}
        )
        getLandMarks(event.latLng.lat(), event.latLng.lng())
        setOpen(true);
    }

    const getLandMarks = async (lat, lng) => {
        const api_call = await fetch(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=d-Whv-xCe9U-Nd43fTJ-oDuDosePR30wGdrcDYHiaxY&mode=retrieveLandmarks&prox=${lat},${lng},100`);
        const data = await api_call.json();

        //create temp Array to store landmarks near the location
        let tempArr = [];

        if(data.Response.View.length > 0) {
            data.Response.View[0].Result.map((landmark) => {
                tempArr.push(landmark.Location.Name);
            })
            setLandmarks(tempArr);
        }
        else {
            setLandmarks(tempArr);
            setInfoText("There is no landmarks here. Try different location.");
        }
    }

    const onClickMarker = () => {
        setShowInfoWindow(true);
    }

    useEffect(() => {
        getPosition();
    }, [])

    return isLoaded ? (
        <div>
            <Container>
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
                <LandmarkList>
                    <Text>Landmark List</Text>
                    {
                        landmarks.length > 0 ? 
                            landmarks.map((landmark, index) => (
                                <Landmark key={index} value={landmark} onClick={handleChange}>{landmark}</Landmark>
                            ))
                        : 
                        <Text>There's no landmarks in the area. Try different location.</Text>
                    }
                </LandmarkList>
            </Container>
            <Address>{infoText}</Address>
        </div>
    ) : <></>
}

export default Map

const Container = styled.div`
    display: grid;
    grid-template-columns: 75% auto;
`;
const Address = styled.div`
    text-align: right;
    font-weight: 600;
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 15px;
    color: #707070;
    font-family: 'Abel', sans-serif;
    margin-right: 20px;
`;
const LandmarkList = styled.div`
    padding-left: 10px;
    padding-top: 10px;
    margin-left: 10px;
`;
const Text = styled.div`
    text-align: left;
    color: #6e2127;
    font-weight: 900;
    font-size: 18px;
    margin-bottom: 10px;
    font-family: 'Abel', san-serif;
`;
const Landmark = styled.button`
    height: 40px;
    width: 100%;
    font-family: 'Abel', sans-serif;
    color: #AD343E;
    font-weight: 900;
    text-align: left;
    display: block;
    border: none;
    background-color: #E0E0CE;

    :hover {
        background-color: #c7c7a8;
        border: none;
        cursor: pointer;
    }
`;