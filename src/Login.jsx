import "./login.css";
import { Link } from "react-router-dom";

export const Login = ({userData, onDataChange, conectar}) => {

  const handleValue = (event) => {
    const { value } = event.target;
    onDataChange({ ...userData, "username": value });
  };

  return (
    <>
      <div className="login">
        <div className="login-card">
          <div className="login-field">
            <h1>Nombre de usuario</h1>
            <input
              type="text"
              placeholder="Username"
              className="input"
              onChange={handleValue}
            />
          </div>

          <div className="login-field">
            <h2>Contraseña</h2>
            <input
              type="password"
              placeholder="Username"
              className="input"
              required
            />
          </div>

          <div className="login-field">
            <div className="button">
              <Link to={`app`}>Entrar</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
