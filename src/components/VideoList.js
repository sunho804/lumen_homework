import React, { useEffect, useState } from 'react'
import Video from '../components/Video';
import axios from 'axios';
import styled from 'styled-components';

function VideoList(props) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": 'https://www.googleapis.com/youtube/v3/search',
            "params": {
                "part": "snippet",
                "maxResults": "18",
                "key": "AIzaSyB9bUw48iMKjnBTCpqkAbvjjB7DK66O5v0",
                "q": props.selectedLocation
            }
        })
        .then((response) => {
            setVideos(response.data.items)
        })
        .catch((error) => {
            console.log(error);
        })
        console.log(videos);
    }, [props.selectedLocation])

    return (
        <Container>
            <ListTitle>Related Videos - {props.selectedLocation}</ListTitle>
            <Videos>
            {
                videos.length > 0 &&
                videos.map((video, index) => (
                    <Video key={video.id.videoId} video={video} />
                ))
                }
                {/* <Video />
                <Video />
                <Video />
                <Video />
                <Video />
                <Video /> */}
            </Videos>
        </Container>
    )
}

export default VideoList

const Container = styled.div`
    border-top: 6px solid #AD343E;
    background: #d7d7c1;
    padding: 15px;
`;

const ListTitle = styled.div`
    text-align: left;
    padding-left: 7px;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 10px;
    font-family: 'Abel', san-serif;
`;

const Videos = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;