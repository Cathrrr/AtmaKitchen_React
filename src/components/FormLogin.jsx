import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { toast } from "sonner";

const FormLogin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.username === "" || user.password === "") {
            toast.error("Username dan Password Tidak Boleh Kosong!");
            return;
        } else if (user.password.length !== 5 || user.username !== "catherine") {
            toast.error("Username harus dengan nama depan dan password harus 5 digit NPM!");
            return;
        } else {
            const newUser = {
                ...user,
                loginAt: new Date(),
            };
            localStorage.setItem("user", JSON.stringify(newUser));
            toast.success("Login berhasil!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "auto" }}>
            <Alert variant="info">
                <strong>Info!</strong> Username harus dengan nama depan dan password harus 5 digit NPM
            </Alert>
            <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    name="username"
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="position-relative">
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    autoComplete="off"
                />
                <Button
                    variant="light"
                    className="position-absolute end-0 top-50 translate-middle-y me-2"
                    onClick={togglePasswordVisibility}
                    style={{
                        border: "none",
                        boxShadow: "none",
                        padding: 0,
                    }}
                >
                    <i className={`bi bi-eye${!showPassword ? "-slash" : ""}`}></i>
                </Button>
            </FloatingLabel>
            <Button variant="primary" type="submit" className="mt-3 w-100">
                Login
            </Button>
        </form>
    );
};

export default FormLogin;
