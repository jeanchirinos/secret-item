import { useContext } from 'react'
import { CtxApp } from 'context/AppContext'
import './Main.scss'

export default function Main() {
  const { lowerNumber, higherNumber, currentNumber, inputRef, handleInputChange, handleSubmit } =
    useContext(CtxApp)

  function moveLabel() {
    const input = inputRef.current
    const label = document.querySelector('label')

    if (input?.value) return
    label?.classList.toggle('selected')
  }

  return (
    <main className='main-wrapper'>
      <span className='lower'>{lowerNumber}</span>
      <span>?</span>
      <span className='higher'>{higherNumber}</span>
      <form onSubmit={handleSubmit}>
        <label>{currentNumber || ''}</label>
        <input
          type='number'
          min={lowerNumber + 1}
          max={higherNumber - 1}
          autoFocus
          required
          ref={inputRef}
          onChange={handleInputChange}
          onFocus={moveLabel}
          onBlur={moveLabel}
        />
      </form>
    </main>
  )
}
