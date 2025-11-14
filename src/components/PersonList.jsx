import { Component } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import './PersonList.css';

const API_URL = 'https://randomuser.me/api/?results=10&nat=ca,us,gb';

class PersonList extends Component {
  state = {
    persons: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchPersons();
  }

  async fetchPersons() {
    try {
      const response = await axios.get(API_URL);
      this.setState({ persons: response.data.results, loading: false });
    } catch (error) {
      this.setState({
        error: 'Unable to load users right now. Please try again later.',
        loading: false,
      });
    }
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  }

  renderPersonCard(person) {
    const fullName = `${person.name.title} ${person.name.first} ${person.name.last}`;
    const address = `${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country} - ${person.location.postcode}`;
    return (
      <Card className="person-card" key={person.login.uuid}>
        <Card.Header className="text-uppercase fw-semibold d-flex justify-content-between flex-column flex-md-row">
          <span>{fullName}</span>
          <small className="text-muted">{person.login.uuid}</small>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center">
            <Col md={3} className="text-center mb-3 mb-md-0">
              <img
                src={person.picture.large}
                alt={`Portrait of ${fullName}`}
                className="person-avatar"
              />
              <Button variant="info" className="mt-3 px-4 text-white">
                Details
              </Button>
            </Col>
            <Col md={9}>
              <Row>
                <Col md={6} className="mb-3">
                  <dl className="person-meta">
                    <dt>User Name:</dt>
                    <dd>{person.login.username}</dd>
                    <dt>Gender:</dt>
                    <dd>{person.gender.toUpperCase()}</dd>
                    <dt>Time Zone Description:</dt>
                    <dd>{person.location.timezone.description}</dd>
                    <dt>Address:</dt>
                    <dd>{address}</dd>
                    <dt>Email:</dt>
                    <dd>{person.email}</dd>
                  </dl>
                </Col>
                <Col md={6}>
                  <dl className="person-meta">
                    <dt>Birth Date and Age:</dt>
                    <dd>
                      {this.formatDate(person.dob.date)} ({person.dob.age})
                    </dd>
                    <dt>Register Date:</dt>
                    <dd>{this.formatDate(person.registered.date)}</dd>
                    <dt>Phone:</dt>
                    <dd>{person.phone}</dd>
                    <dt>Cell:</dt>
                    <dd>{person.cell}</dd>
                  </dl>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

  renderContent() {
    const { persons, loading, error } = this.state;

    if (loading) {
      return (
        <div className="text-center py-5">
          <Spinner animation="border" variant="info" />
          <p className="mt-3">Fetching random user profiles...</p>
        </div>
      );
    }

    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }

    return persons.map((person) => this.renderPersonCard(person));
  }

  render() {
    return <div className="person-list">{this.renderContent()}</div>;
  }
}

export default PersonList;
