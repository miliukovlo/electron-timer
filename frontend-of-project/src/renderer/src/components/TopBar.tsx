import React from 'react'

interface TobBarProps{
    isOverlay: boolean
}

const TopBar: React.FC<TobBarProps> = ({
    isOverlay
}) => {

    const handleClose = (): void => {
        window.electron.ipcRenderer.send('close-window')
    }
    const handleMinimize = (): void => {
        window.electron.ipcRenderer.send('minimize-window')
    }

    return (
        <div className={!isOverlay ? "visible" : "invisible"}>
            <div className='rounded-t-xl bg-blue-400 w-screen h-5 cursor-pointer title-drag'></div>
            <div className="bg-blue-400 w-screen h-3">
                <div id="controlls-button" className='text-stone-200 absolute top-1 right-0 pe-2'>
                    <button id='minimuze' className='p-1' onClick={handleMinimize}>&#128469;</button>
                    <button id='close' className='p-1' onClick={handleClose}>&#x2715;</button>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
