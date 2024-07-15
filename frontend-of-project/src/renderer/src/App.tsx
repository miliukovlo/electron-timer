import { useEffect, useState } from "react"
import TopBar from "./components/TopBar"
import Timer from "./components/Timer"

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [isOverlay, setIsOverlay] = useState<boolean>(false)

  useEffect(() => {
    window.electron.ipcRenderer.on("overlay-mode", () => {
      setIsOverlay(prevState => !prevState)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners("overlay-mode")
    }
  }, [])
  return (
    <>
      <TopBar
        isOverlay={isOverlay}
      />
      <Timer
        isOverlay={isOverlay}
      />
    </>
  )
}

export default App
