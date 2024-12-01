import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "sonner";

const DashboardPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [bahanBaku, setBahanBaku] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({
        nama: "",
        status: "",
        tanggal: "",
        jumlah: "",
    });

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    };

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "Pending":
                return "primary";
            case "Diproses":
                return "warning text-dark";
            case "Selesai":
                return "success";
            default:
                return "secondary";
        }
    };

    const handleShowModal = (index = null) => {
        setEditIndex(index);
        if (index !== null) {
            setFormData({ ...bahanBaku[index] });
        } else {
            setFormData({ nama: "", status: "", tanggal: "", jumlah: "" });
        }
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
        setEditIndex(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        if (editIndex !== null) {
            const updatedBahanBaku = [...bahanBaku];
            updatedBahanBaku[editIndex] = formData;
            setBahanBaku(updatedBahanBaku);
            toast.success("Berhasil Ubah Data Bahan Baku!");
        } else {
            setBahanBaku([...bahanBaku, formData]);
            toast.success("Berhasil Tambah Data Bahan Baku!");
        }
        handleHideModal();
    };

    const handleDelete = (index) => {
        const updatedBahanBaku = bahanBaku.filter((_, i) => i !== index);
        setBahanBaku(updatedBahanBaku);
        toast.success("Berhasil Hapus Data!");
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
            <Row className="mb-4">
                <Col md={10}>
                    <Card className="h-100 justify-content-center">
                        <Card.Body>
                            <h4>Selamat datang,</h4>
                            <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                            <p className="mb-0">Kamu sudah login sejak:</p>
                            <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Body>
                            <p>Bukti sedang ngantor:</p>
                            <img
                                src="https://via.placeholder.com/150"
                                className="img-fluid rounded"
                                alt="Tidak Ada Gambar"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div>
                <h3>Daftar Pembelian Bahan Baku</h3>
                <p>
                    Saat ini terdapat <strong>{bahanBaku.length}</strong> daftar pembelian bahan baku.
                </p>
                <Button variant="success" onClick={() => handleShowModal()}>
                    <i className="bi bi-plus-square me-2"></i>
                    Tambah Bahan Baku
                </Button>
                <Row className="mt-3">
                    {bahanBaku.length > 0 ? (
                        bahanBaku.map((item, index) => (
                            <Col md={4} key={index}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <h5 className="fw-bold">{item.nama} - {item.jumlah}</h5>

                                        <p className="mb-2">
                                            <strong>Tanggal:</strong> {item.tanggal}
                                        </p>

                                        <p>
                                            <span className={`badge bg-${getStatusBadgeColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </p>

                                        <div className="d-flex justify-content-start mt-3">
                                            <Button
                                                variant="danger"
                                                className="me-2"
                                                onClick={() => handleDelete(index)}
                                            >
                                                <i className="bi bi-trash me-2"></i>
                                                Hapus
                                            </Button>
                                            <Button
                                                variant="primary"
                                                onClick={() => handleShowModal(index)}
                                            >
                                                <i className="bi bi-pencil-square me-2"></i>
                                                Edit
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="text-center mt-3">Tidak ada data bahan baku.</p>
                    )}
                </Row>
            </div>

            <Modal show={showModal} onHide={handleHideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? "Edit" : "Tambah"} Bahan Baku</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Bahan Baku</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                placeholder="Nama Bahan Baku"
                                value={formData.nama}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status Pesanan</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>
                                    Pilih Status
                                </option>
                                <option value="Pending">Pending</option>
                                <option value="Diproses">Diproses</option>
                                <option value="Selesai">Selesai</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal Pesanan</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggal"
                                placeholder="dd/mm/yyyy"
                                value={formData.tanggal}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Pesanan</Form.Label>
                            <Form.Control
                                type="text"
                                name="jumlah"
                                placeholder="Jumlah Pesanan"
                                value={formData.jumlah}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideModal}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        <i className="bi bi-save me-2"></i>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DashboardPage;
