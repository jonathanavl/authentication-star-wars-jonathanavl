import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { actions } = useContext(Context);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error

        const user = await actions.login(username, password);
        if (user) {
            navigate('/');
        } else {
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card text-light" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#1a1a1a', borderRadius: '12px', border: '2px solid #333' }}>
            <div className="card-body">
                <h3 className="card-title text-warning text-center" style={{ fontSize: '2rem', letterSpacing: '2px' }}>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-warning" style={{ fontSize: '1.1rem' }}>Username</label>
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
                    <button type="submit" className="btn btn-warning w-100" style={{ fontSize: '1.1rem', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>Submit</button>
                </form>
            </div>
        </div>
    </div>
);
};
