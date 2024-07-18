import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import alarm from '../assets/sounds/nice-wake-up-call.mp3'

interface TimerProps {
    isOverlay: boolean
}

const Timer: React.FC<TimerProps> = ({isOverlay}: TimerProps) => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(true)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)

    const audio = new Audio(alarm)

    const reset = (): void => {
        setHours(0),
        setMinutes(0),
        setSeconds(0)
    }
    useEffect(() => {
        let interval
    
        if(isActive) {
            interval = setInterval(() => {
                if(seconds > 0) {
                    setSeconds(prevSeconds => prevSeconds - 1)
                } else {
                    if (minutes === 0 && hours === 0) {
                        audio.play()
                        clearInterval(interval)
                        setIsActive(false)
                        setTimeout(() => {
                            audio.pause()
                        }, 3900)
                    } else {
                        if (minutes === 0 && hours > 0) {
                            setHours(prevHours => prevHours - 1)
                            setMinutes(59)
                        } else {
                            setMinutes(prevMinutes => prevMinutes - 1)
                        }
                        setSeconds(59)
                    }
                }
            }, 1000)
        } else {
            clearInterval(interval)
        }
    
        return (): void => clearInterval(interval)
    }, [isActive, hours, minutes, seconds, setHours, setMinutes, setSeconds])

    const edit = (): void => {
        setIsEditing(false)
    }
    

    return (
        <div className={""}>
            {isEditing ? 
                //Настройка таймера
                <div className={isOverlay ? 'flex justify-center items-center flex-col bg-black bg-opacity-30 rounded-xl' : 'flex justify-center items-center flex-col bg-black bg-opacity-30 rounded-b-xl'}>
                    <InputField
                        label='Часы'
                        value={hours}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setHours(parseInt(e.target.value))}}
                        placeholder='Час'
                        type='hours'
                    />
                    <InputField
                        label='Минуты'
                        value={minutes}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setMinutes(parseInt(e.target.value))}}
                        placeholder='Минута'
                        type='minutes'
                    />
                    <InputField
                        label='Секунды'
                        value={seconds}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSeconds(parseInt(e.target.value))}}
                        placeholder='Секунда'
                        type='seconds'
                    />
                    <button 
                        className='bg-blue-500 text-stone-200 px-20 py-1 rounded-xl text-xl mt-1 ml-1 m-4'
                        onClick={() => {edit()}}
                    >
                        &#10004;
                    </button>
                </div>
                :
                // Сам таймер
                <div className={""}>
                    <div className={isOverlay ? 'flex justify-center items-center flex-col bg-black bg-opacity-30 rounded-xl' : 'flex justify-center items-center flex-col bg-black bg-opacity-30'}>
                        <h1 className='text-green-500 text-6xl'>
                            {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                        </h1>
                    </div>
                    <div id="timer-buttons" className={!isOverlay ? 'bg-black bg-opacity-40 w-screen flex justify-center rounded-b-xl' : 'hidden'}>
                        {isActive ?
                            <div className='bg-black bg-opacity-30 w-screen flex justify-center'>
                                <button className='m-10 text-2xl text-yellow-500' onClick={() => {setIsActive(false)}}>||</button>
                                <button className='m-10 text-2xl text-red-500' onClick={() => {reset()}}>&#9632;</button>
                            </div>
                        :
                        <div className={!isOverlay ? 'bg-black bg-opacity-40 w-screen flex justify-center rounded-b-xl' : 'hidden'}>
                            <button className='m-10 text-2xl text-green-500' onClick={() => {setIsActive(true)}}>&#9658;</button>
                            <button onClick={() => {setIsEditing(true); setIsActive(false)}} className='m-10 text-2xl text-yellow-500'>&#9998;</button>
                        </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Timer;
