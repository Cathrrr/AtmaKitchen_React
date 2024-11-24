import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import FormLogin from "../components/FormLogin";

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/dashboard");
        }
    }, [navigate]);

    return (
        <Container className="mt-5">
            <h1 className="text-center display-4">
                <strong>Welcome Admin!</strong>
            </h1>
            <p className="text-center lead">
                Untuk memastikan identitas, silakan isi form berikut:
                <hr className="featurette-divider" />
            </p>
            <FormLogin />
        </Container>
    );
};

export default LoginPage;
