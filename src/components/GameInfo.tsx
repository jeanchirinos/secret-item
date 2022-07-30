import { useContext } from 'react'
import { CtxApp } from '../context/AppContext'

export default function GameInfo() {
  const { attemps, maxNumber, changeMaxNumber } = useContext(CtxApp)

  return (
    <div className='game-info'>
      <span>Intentos: {attemps} / Rango: 0 - </span>
      <input
        type='number'
        min={1}
        max={1000}
        onChange={changeMaxNumber}
        className='maxNumber'
        value={maxNumber}
      />
    </div>
  )
}
