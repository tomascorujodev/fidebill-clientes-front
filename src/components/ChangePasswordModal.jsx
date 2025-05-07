import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { PATCH } from "../services/Fetch";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordModal({ changePassword, setChangePassword }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [ok, setOk] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit() {
        setIsLoading(true);
        if (newPassword.length < 8) {
            setMessage("La contraseña debe tener al menos 8 caracteres");
        } else {
            if (newPassword != confirmPassword) {
                setMessage("Las contraseñas no coinciden");
            } else {
                let rsp = await PATCH("Authclientes/cambiarclave", newPassword);
                switch (rsp?.status) {
                    case 200:
                        rsp = await rsp.json();
                        setMessage("");
                        setOk(true);
                        break;
                    case 404:
                        navigate("/404");
                        break;
                    case 500:
                        setMessage("Ocurrio un error en el servidor, por favor, contactese con un administrador");
                        break;
                    default:
                        if (navigator.onLine) {
                            setMessage("El servidor no responde. Por favor vuelva a intentarlo en unos minutos. Si el problema persiste contáctese con la sucursal más cercana");
                        } else {
                            setMessage("No hemos podido contactar el servidor, verifique la conexión y vuelva a intentarlo.");
                        }
                        break;
                }
            }
        }
        setIsLoading(false);
    }

    return (
        <Modal show={changePassword} >
            <Modal.Header className="flex-column">
                <Modal.Title>Cambiar Contraseña</Modal.Title>
                <br />
                {
                    !ok &&
                    <p style={{ fontSize: "0.8rem" }} className="text-muted d-block">
                        Ingresa una nueva contraseña segura y confírmala para actualizar tu acceso.
                    </p>
                }
            </Modal.Header>
            <Modal.Body>
                {message && <Alert variant="danger">{message}</Alert>}
                {ok &&
                    <Alert variant="success">La contraseña ha sido cambiada con exito!</Alert>
                }
                {
                    !ok &&
                    <Form>
                        <input type="text" name="username" defaultValue="username" autoComplete="username" hidden></input>
                        <Form.Group className="mb-3">
                            <Form.Label>Nueva Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                autoComplete="new-password"
                                placeholder="Ingresa tu nueva contraseña"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                autoComplete="new-password"
                                placeholder="Repite tu nueva contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                }
            </Modal.Body>
            <Modal.Footer className="d-flex"> 
                    <Form.Check
                        type="checkbox"
                        id="noVolverAPreguntar"
                        label="No volver a preguntar"
                        className="btn btn-link text-muted position-absolute"
                        style={{ fontSize: "0.75rem", bottom: "28px", left: "20px" }}
                    /> {/*falta todo el desarrollo backend para implementar el no volver a preguntar
                     */}
                <div className="d-flex justify-content-between w-100">
                    <button
                        className="btn btn-link text-muted ms-2 p-0 align-self-end"
                        style={{ fontSize: "0.75rem", textDecoration: "underline" }}
                        onClick={() => setChangePassword(false)}
                    >
                        Omitir
                    </button>
                    {
                        !isLoading ?
                            <Button variant="primary" onClick={!ok ? handleSubmit : () => setChangePassword(false)}>{!ok ? "Enviar" : "Aceptar"}</Button>
                            :
                            <div style={{ justifySelf: "center" }} className="d-flex spinner-border" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                    }
                </div>
            </Modal.Footer>
        </Modal>
    )
}