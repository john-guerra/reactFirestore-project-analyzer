import BaseTemplate from "./BaseTemplate.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

import { myDB } from "../db/myFireStore.js";

function AuthorsCard({ author }) {
  return (
    <Form>
      <div className="border border-gray-300 rounded-md p-4 mb-2">
        <Form.Group className="mb-3" controlId="author_name">
          <Form.Label>Name</Form.Label>
          {author.name}
        </Form.Group>
        <Form.Group className="mb-3" controlId="author_email">
          <Form.Label>Email</Form.Label>
          {author.email}
        </Form.Group>
        <Form.Group className="mb-3" controlId="author_image">
          <Form.Label>Image</Form.Label>
          {author.image}
        </Form.Group>

        <Form.Group className="mb-3" controlId="author_email">
          <Form.Label>Bio</Form.Label>
          {author.bio}
        </Form.Group>

        <Form.Group className="d-flex gap-2">
          <Button variant="primary">Edit</Button>
          <Button variant="danger">Delete</Button>
        </Form.Group>
      </div>
    </Form>
  );
}

export default function AboutPage() {
  let [authors, setAuthors] = useState([]);
  let [query, setQuery] = useState("John");


  async function getAuthors() {
    const authorsList = await myDB.getAuthors(query);
    console.log("Got authors", authorsList);

    setAuthors(authorsList);
  }
  useEffect(() => {
    getAuthors();
  }, []);

  function renderAuthors() {
    return authors.map((a, i) => (
      <AuthorsCard key={`author_${i}`} author={a} />
    ));
  }

  console.log("AboutPage render", query);

  return (
    <BaseTemplate>
      <h2>AboutPage</h2>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
        assumenda ipsam quasi aspernatur eius tempore eligendi dolores ad,
        laudantium ipsum perferendis molestiae ex quas aliquam amet voluptas
        quidem aliquid sequi!
      </div>

      <h2>Authors</h2>
      <Form>
        <Form.Group className="mb-3" controlId="query">
          <Form.Label>Search</Form.Label>
          <Form.Control type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={() => getAuthors()}>Search</Button>
      </Form>
      {renderAuthors()}
    </BaseTemplate>
  );
}
