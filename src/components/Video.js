import React from 'react';
import styled from 'styled-components';

function Video(props) {
    const video = props.video;

    return (
        <VideoContainer>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} />
            <VideoDescription>{video.snippet.title}</VideoDescription>
            {/* <img src={'https://i.ytimg.com/vi/ferZnZ0_rSM/mqdefault.jpg'} alt="example" />
            <VideoDescription>Anderson .Paak &amp; The Free Nationals: NPR Music Tiny Desk Concert</VideoDescription> */}
        </VideoContainer>
    )
}

export default Video;

const VideoContainer = styled.div`
    border-radius: 5px;
    background: #cfcfb4;
    margin: 7px;
    padding: 10px;
    img {
        width: 100%;
    }
`;
const VideoDescription = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: #474747;
    font-weight: 600;
    font-family: 'Abel', san-serif;
`;
