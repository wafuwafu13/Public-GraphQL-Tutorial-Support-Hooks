import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { getAuthorsQuery, addBookMutation } from "../queries/queries";

const displayAuthors = (loading, data) => {
  if (loading) {
    return <option disabled>Loading...</option>;
  } else {
    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }
};

const submitForm = (addBook, name, genre, authorId) => {
  addBook({ variables: { name, genre, authorId } });
};

const AddBook = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const { loading, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  return (
    <form
      id="add-book"
      onSubmit={(e) => submitForm(e, addBook, name, genre, authorId)}
    >
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors(loading, data)}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
