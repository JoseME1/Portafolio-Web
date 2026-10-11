import React, {useEffect, useRef} from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';

import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
    options: {
        autoplay?: boolean;
        controls?: boolean;
        responsive?: boolean;
        fluid?: boolean;
        poster?: string;
        sources:{
            src: string;
            type: string;
        }[];
    };
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({options}) => {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<Player| null>(null);

    useEffect(()=>{
        if(!playerRef.current && videoRef.current){
            const videoElement = document.createElement("video-js");
            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = (playerRef.current = videojs(videoElement, options));
        } else if (playerRef.current){
            const player = playerRef.current;
            player.autoplay(options.autoplay ?? false);
            player.src(options.sources);
        }
    }, [options]);

    useEffect(()=>{
        const player = playerRef.current;
        return () =>{
            if(player && !player.isDisposed()){
                player.dispose();
                playerRef.current = null;
            }
        };
    },[]);

    return(
        <div data-vjs-player className="w-full rounded-2xl overflow-hidden shadow-lg border border-[#ffffff10]">
            <div ref={videoRef} />
        </div>
    );
};

export default VideoPlayer;