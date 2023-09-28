'use client'
import React from 'react';
import '/styles/login.css';
import { Button } from 'flowbite-react';


const Login = () => {
    return (
        <div>
            <div className="popup">
            <img className='logoUnbiters' src='/images/LogoUnb.png'></img>
                <div className='dataTC'>Al continuar aceptas los terminos y
                    condiciones y aceptas nuestra politica de tratamiento de datos
                </div>
                <div className='emailContainer'>
                    <input className='emailInput' placeholder='Email' 
                    /></div>

                <div className='passwordContainer'>
                    <input type='password' className='passwordInput' placeholder='Contraseña'/>
                </div>
                <div className='forgotPassword'>Olvidaste tu contraseña?</div>
                <Button className='loginBtn'>
                    <div className='loginText'>Iniciar Sesión
                    </div>
                </Button>

                <div className='lineL'></div>
                <div className='o'>o</div>
                <div className='lineR'></div>

                <Button className='googleLogin'>
                    <img className='googleIcon' src='/images/GoogleLogo.png'></img>
                    <div className='googleText'>Inicia sesión con Google</div>
                </Button>
                <Button className='xLogin'>
                    <img className='xIcon' src='/images/XLogo.png'></img>
                    <div className='xText'>Inicia sesión con X
                    </div>
                </Button>

                <div className='line'></div>
                <div className='noAccount '>¿No tienes cuenta?</div>
                <div className='SingIn'>Registarte</div>
            </div>
            


        </div>
    );
}

export default Login;