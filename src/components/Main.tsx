import { useContext } from 'react'
import { CtxApp } from '../context/AppContext'

export default function Main() {
  const {
    handleSubmit,
    currentNumber,
    moveLabel,
    inputRef,
    handleInputChange,
    lowerNumber,
    higherNumber
  } = useContext(CtxApp)

  return (
    <main>
      <span className='lower'>{lowerNumber}</span>
      <span>?</span>
      <span className='higher'>{higherNumber}</span>
      <form onSubmit={handleSubmit} id='form-currentNumber'>
        <label>{currentNumber || ''}</label>
        <input
          type='number'
          autoFocus
          onFocus={moveLabel}
          onBlur={moveLabel}
          ref={inputRef}
          required
          className='currentNumber'
          onChange={handleInputChange}
          min={lowerNumber + 1}
          max={higherNumber - 1}
        />
      </form>
    </main>
  )
}
