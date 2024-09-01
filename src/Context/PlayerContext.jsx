import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";



export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const play = ()=>{
        audioRef.current.play();
        setPlayStatus(true)
    };
    const pause = ()=>{
        audioRef.current.pause();
        setPlayStatus(false)
    };


    const playWithId = async (id)=> {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);

    };
    const Previous = async () => {
        // Ensure track.id is greater than 0 to avoid negative index errors
        if (track.id > 0) {
            // Update the track state to the previous track
            setTrack(songsData[track.id - 1]);
    
            // Play the updated track
            audioRef.current.play();
    
            // Update the play status to reflect that the track is playing
            setPlayStatus(true);
        }
    };

    
    const next = async ()=>{
        if(track.id <songsData.length-1) {
            await setTrack(songsData[track.id+1]);
            await audioRef.current.play();
            setPlayStatus(true);

        }
    };
    const seekSong = (e) => {
        // Calculate the new time for the audio based on where the user clicked on the seek bar
        const clickPositionX = e.nativeEvent.offsetX; // Corrected 'offSetX' to 'offsetX'
        const seekBarWidth = seekBg.current.offsetWidth; // Corrected 'offSetWidth' to 'offsetWidth'
        const duration = audioRef.current.duration;
    
        // Update the current time of the audio based on the click position
        audioRef.current.currentTime = (clickPositionX / seekBarWidth) * duration;
    };
    

    useEffect(()=>{
        setTimeout(() => {
            audioRef.current.ontimeupdate = ()=>{
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000);

    },[audioRef])




    const ContextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, 
        setTrack,
        playStatus, 
        setPlayStatus,
        time, 
        setTime,
        play,
        pause,
        playWithId,
        Previous,
        next,
        seekSong
    }
    return (

        <PlayerContext.Provider value={ContextValue}>
            {props.children}
        </PlayerContext.Provider>

    )
}
export default PlayerContextProvider;