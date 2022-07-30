import { useContext } from 'react'
import { CtxApp } from 'context/AppContext'
import './Modal.scss'
import { MdReplay } from 'react-icons/md'

export default function Modal() {
  const { attemps, secretNumber, resetApp } = useContext(CtxApp)

  return (
    <dialog>
      <p>Ganaste!</p>
      <p>#️⃣ secreto : {secretNumber}</p>
      <p>Intentos : {attemps}</p>
      <button onClick={resetApp}>
        <MdReplay />
      </button>
    </dialog>
  )
}
