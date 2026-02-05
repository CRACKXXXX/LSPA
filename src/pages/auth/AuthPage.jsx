
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.username || !formData.password) {
            setError('Por favor rellena todos los campos');
            return;
        }

        const action = isLogin ? login : register;
        const result = action(formData.username, formData.password);

        if (result.success) {
            navigate('/profile');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass-panel">
                <div className="auth-tabs">
                    <button 
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        INICIAR SESIÓN
                    </button>
                    <button 
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        REGISTRARSE
                    </button>
                </div>

                <div className="auth-body">
                    <h2>{isLogin ? 'Bienvenido de nuevo' : 'Únete a la Élite'}</h2>
                    <p className="auth-subtitle">
                        {isLogin 
                            ? 'Accede a tu garaje y estadísticas.' 
                            : 'Crea tu identidad y empieza a ganar XP.'}
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="auth-username">Usuario</label>
                            <input 
                                id="auth-username"
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                placeholder="Ej: FranklinC"
                                autoComplete="username"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="auth-password">Contraseña</label>
                            <input 
                                id="auth-password"
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                        </div>

                        {error && <div className="auth-error">{error}</div>}

                        <button type="submit" className="auth-submit-btn">
                            {isLogin ? 'ENTRAR' : 'CREAR CUENTA'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
