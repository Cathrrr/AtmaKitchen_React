import { Container, Row, Col } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";
import imgFeaturette1 from "../assets/images/featurette-1.jpg";
import imgFeaturette2 from "../assets/images/featurette-2.jpg";
import imgBakery1 from "../assets/images/bakery1.jpeg";
import imgBakery2 from "../assets/images/bakery2.jpeg";
import imgBakery3 from "../assets/images/bakery3.jpeg";
import imgRoti1 from "../assets/images/roti1.jpg";
import imgRoti2 from "../assets/images/roti2.jpg";
import imgRoti3 from "../assets/images/roti3.jpg";
import imgRoti4 from "../assets/images/roti4.jpg";

const cardData = [
    {
        img: imgRoti1,
        title: "Freshly Baked, Always Delightful",
        description:
            "Indulge in the warmth and comfort of freshly baked goods, crafted with love and the finest ingredients.",
    },
    {
        img: imgRoti2,
        title: "A Taste for Every Palate",
        description:
            "Atma Kitchen offers a delightful mix of classic and innovative creations that are sure to please every palate.",
    },
    {
        img: imgRoti3,
        title: "Where Tradition Meets Taste",
        description:
            "At Atma Kitchen, every bite tells a story of tradition, quality, and passion for baking.",
    },
    {
        img: imgRoti4,
        title: "Crafted to Perfection",
        description:
            "From flaky croissants to soft, golden loaves, each product is a testament to our commitment to excellence.",
    },
];

const images = [
    {
        img: imgBakery1,
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
        img: imgBakery2,
        title: "Second slide label",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        img: imgBakery3,
        title: "Third slide label",
        description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
];

const HomePage = () => {
    return (
        <>
            <ImageCarousel images={images} />

            <Container className="mt-5">
                <Row>
                    <Col md={7}>
                        <h2 className="fw-normal">
                            Bakery pertama dan satu-satunya <strong>yang fiksional</strong>.
                        </h2>
                        <p className="lead">
                            Diciptakan oleh <strong>Catherine Charissa Oktaviani</strong>, Mahasiswa Universitas Atma
                            Jaya Yogyakarta dari program studi Informatika.
                        </p>
                        <p className="lead">Nomor Pokok Mahasiswa: <strong>220711939</strong>.</p>
                    </Col>
                    <Col md={5}>
                        <img
                            src={imgFeaturette1}
                            className="img-fluid mx-auto rounded shadow"
                            role="img"
                            aria-label="Gambar featurette 1"
                        />
                    </Col>
                </Row>
                <hr className="mt-5 mb-5" />
            </Container>

            <Container className="mt-5">
                {cardData.map((card, index) => (
                    <Row key={index} className={`align-items-top mb-5 ${index % 2 !== 0 ? "flex-row-reverse" : ""}`}>
                        <Col md={6}>
                            <img
                                src={card.img}
                                alt={card.title}
                                className="img-fluid rounded shadow"
                            />
                        </Col>
                        <Col md={6}>
                            <h2 className="fw-bold">{card.title}</h2>
                            <p className="lead">{card.description}</p>
                        </Col>
                    </Row>
                ))}
            </Container>
        </>
    );
};

export default HomePage;
