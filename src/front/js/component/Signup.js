import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { actions } = useContext(Context);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Estado de carga
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true); // Iniciar estado de carga

        const userData = {
            username,
            email,
            password
        };

        const user = await actions.signup(userData);
        setLoading(false); // Finalizar estado de carga

        if (user) {
            navigate('/');
        } else {
            setError('Signup failed, please try again.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card text-light" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#1a1a1a', borderRadius: '12px', border: '2px solid #333' }}>
                <div className="card-body">
                    <div className="card-title text-center">
                        <h3 className="text-warning" style={{ fontSize: '2rem', letterSpacing: '2px' }}>Signup</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar errores */}
                        <div className="mb-3">
                            <label className="form-label text-warning" style={{ fontSize: '1.1rem' }}>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ backgroundColor: '#333', color: '#ddd', border: '1px solid #555', borderRadius: '6px' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-warning" style={{ fontSize: '1.1rem' }}>Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={{ backgroundColor: '#333', color: '#ddd', border: '1px solid #555', borderRadius: '6px' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-warning" style={{ fontSize: '1.1rem' }}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ backgroundColor: '#333', color: '#ddd', border: '1px solid #555', borderRadius: '6px' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-warning w-100" style={{ fontSize: '1.1rem', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }} disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'} {/* Cambiar el texto del botón al enviar */}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
