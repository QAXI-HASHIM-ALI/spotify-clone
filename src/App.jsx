import { useContext } from "react"
import Display from "./Components/Display"
import Player from "./Components/Player"
import SideBar from "./Components/SideBar"
import { PlayerContext } from "./Context/PlayerContext"

const App = () => {

  const {audioRef,track} = useContext(PlayerContext);
  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <SideBar />
        <Display/>


      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"></audio>

    </div>
  )
}

export default App