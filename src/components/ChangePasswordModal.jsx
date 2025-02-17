import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { PATCH } from "../services/Fetch";
import jwtDecode from "../utils/jwtDecode";

export default function ChangePasswordModal({changePassword}) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    
    function handleSubmit(){
        PATCH();
    }

    return (
        <Modal show={changePassword} >
            <Modal.Header>
                <Modal.Title>Cambiar Contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message && <Alert variant="danger">message</Alert>}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nueva Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingresa tu nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repite tu nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">Enviar</Button>
            </Modal.Footer>
        </Modal>
    )
}