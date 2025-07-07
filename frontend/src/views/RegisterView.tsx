import { Link } from 'react-router-dom'

export default function RegisterView() {
  return (
    <>
        <div>LoginView</div>
        <nav>
            <Link to='/auth/login'>
            Ya tienes cuenta? Inicia sesion aquí
            </Link>
        </nav>
    </>
  )
}
