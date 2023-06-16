import React, { useEffect, useState } from 'react'
import '../styles/login.module.css';
import styles from '@/styles/login.module.css'
import clientAxios from '@/utils/axios';
import { useRouter } from 'next/router';

const login = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [authState, setAuthState] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('');
    //const dispatch = useDispatch();

    const router = useRouter();

    const { username, password, confirmPassword } = authState;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            router.push('/');
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthState(prev => ({ ...prev, [name]: value }));
    }

    const register = (e) => {
        e.preventDefault();
        if (!username || !password || !confirmPassword) {
            setError('Todos los campos son requeridos')
            return
        }

        if (username.length < 4) {
            setError('El usuario debe tener al menos 4 caracteres')
            return
        }
       
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        clientAxios.post('/auth/register', {
                username,
                password
            })
                .then(res => {
                    localStorage.setItem('token', res.data.token)
    
                    /* dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: {
                            username: res.data.username
                        }
                    }); */
                    //history('/')
                    console.log("LLEGO HASTA AQUI ", res);
                })
                .catch(err => setError("Ocurrio un problema en el servidor. Intentelo de nuevo."))
    }

    const login = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Todos los campos son requeridos')
            return
        }
        
        clientAxios.post('/auth/login', {
            username,
            password
        })
            .then(res => {
                localStorage.setItem('token', res.data.token)

                /* dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        username: res.data.username
                    }
                }); */
                router.push('/');
            })
            .catch(err => setError("Ocurrio un problema en el servidor. Intentelo de nuevo."))
    }

    return (
        <div className={`${styles.Auth} ${showLogin && styles.active}`}>
            {/* {
                error && <MessageError msg={error} setError={setError} />
            } */}
            <div className={styles.container}>
                <div className={styles.blueBg}>
                    <div className={`${styles.box} ${styles.signin}`}>
                        <h2>Ya tienes una cuenta?</h2>
                        <button
                            onClick={() => setShowLogin(!showLogin)}
                            className={styles.signinBtn}
                        >Iniciar</button>
                    </div>
                    <div className={`${styles.box} ${styles.signup}`}>
                        <h2>No tienes una cuenta?</h2>
                        <button
                            onClick={() => setShowLogin(!showLogin)}
                            className={styles.signupBtn}
                        >Registrate Aqui</button>
                    </div>
                </div>
                <div className={`${styles.formBx} ${showLogin && styles.active}`}>
                    <div className={`${styles.form} ${styles.signinForm}`}>
                        <form>
                            <h3>Iniciar Sesion</h3>
                            <input
                                type="text"
                                name='username'
                                value={authState.username}
                                onChange={handleChange}
                                placeholder='Nombre de Usuario'
                            />
                            <input
                                type="password"
                                name='password'
                                value={authState.password}
                                placeholder='Contraseña'
                                onChange={handleChange}
                            />
                            <button onClick={login}>
                                Iniciar Sesion
                            </button>
                            {/* <Link to='forgot' className='forgot'>Recuperar Contraseña</Link> */}
                        </form>
                    </div>

                    <div className={`${styles.form} ${styles.signupForm}`}>
                        <form>
                            <h3>Registrarse</h3>
                            <input
                                type="text"
                                name='username'
                                value={authState.username}
                                placeholder='Nombre de Usuario'
                                onChange={handleChange}
                            />
                            {/* <input
                                type="text"
                                name='email'
                                value={authState.email}
                                placeholder='Email'
                                onChange={handleChange}
                            /> */}
                            <input
                                type="password"
                                name='password'
                                value={authState.password}
                                placeholder='Contraseña'
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name='confirmPassword'
                                value={authState.confirmPassword}
                                placeholder='Confirmar Contraseña'
                                onChange={handleChange}
                            />
                            <button onClick={register}>
                                Registrarse
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* {error && <Message msg={error} setError={setError} />} */}
        </div>
    )
}

export default login