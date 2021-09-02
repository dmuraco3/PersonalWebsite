import Navigation from "../../components/navbar";
import Footer from "../../components/Footer";
import styles from "./Contact.module.scss";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
export default function Contact() {
  return (
    <main className={styles.container}>
      <Navigation />
      <div className={styles.main}>
        <h1>contact me</h1>
        <br />
        <h4>
          If you'd like to have a chat about a project please fill in the form
          below and I'll get back within 1-2 days.
        </h4>
        <Form style={{ textAlign: "left", paddingTop: "50px" }}>
          <Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>NAME</Form.Label>
              <Form.Control type="string" />
            </Form.Group>
            <Form.Group as={Col} controlId="email">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <Form.Group as={Col} controlId="message">
              <Form.Label>MESSAGE</Form.Label>
              <Form.Control as="textarea" rows={8} />
            </Form.Group>
          </Row>
          <div className={`${styles.buttonHolder} buttonHolder`}>
            <button className={styles.submitButton} type="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
      <Footer />
    </main>
  );
}
