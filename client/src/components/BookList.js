import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import BookDetails from "./BookDetails";
import { getBooksQuery } from "../queries/queries";

const displayBooks = (loading, data, setSelected) => {
  if (loading) {
    return <p>Loading...</p>;
  } else {
    return data.books.map((book) => {
      return (
        <li
          key={book.id}
          onClick={(e) => {
            setSelected(book.id);
          }}
        >
          {book.name}
        </li>
      );
    });
  }
};

const BookList = () => {
  const { loading, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <ul id="book-list">{displayBooks(loading, data, setSelected)}</ul>
      <BookDetails bookid={selected} />
    </div>
  );
}

export default BookList;
