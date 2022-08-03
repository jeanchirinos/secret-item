import { useContext } from 'react'
import { CtxApp } from 'context/AppContext'
import './GameInfo.scss'

export default function GameInfo() {
  const { attemps, maxNumber, changeMaxNumber } = useContext(CtxApp)

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const number = Number(e.target.value)

    if (number <= 1 || number > 1000) changeMaxNumber()
  }

  return (
    <div className='info-wrapper'>
      <span>Intentos: {attemps} 〰 Rango: 1 - </span>
      <input
        type='number'
        min={2}
        max={1000}
        step={10}
        inputMode='numeric'
        value={maxNumber || ''}
        onChange={changeMaxNumber}
        onBlur={handleBlur}
      />
    </div>
  )
}
