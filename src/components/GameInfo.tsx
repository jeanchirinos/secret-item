import { useContext } from 'react'
import { CtxApp } from 'context/AppContext'
import './GameInfo.scss'

export default function GameInfo() {
  const { attemps, maxNumber, changeMaxNumber } = useContext(CtxApp)

  return (
    <div className='info-wrapper'>
      <span>Intentos: {attemps} 〰 Rango: 1 - </span>
      <input type='number' min={2} max={1000} value={maxNumber} onChange={changeMaxNumber} />
    </div>
  )
}
