const express = require("express");
const app = express();

let books = [
  {
    id: "b1",
    title: "Book One",
    description: "Description of book one",
    authorId: "a1",
  },
  {
    id: "b2",
    title: "Book Two",
    description: "Description of book two",
    authorId: "a2",
  },
];

let reviews = [
  { id: "r1", text: "Amazing book!", bookId: "b1" },
  { id: "r2", text: "Decent read.", bookId: "b2" },
];

let authors = [
  { id: "a1", name: "Author One", bio: "Bio of Author One" },
  { id: "a2", name: "Author Two", bio: "Bio of Author Two" },
];

//routing & controller code go here

//home page
app.get("/", (req, res) => {
  const allData = {
    html: "Welcome to my Bookstore",
    books: { books },
    reviews: { reviews },
    authors: { authors },
  };
  res.send(allData);
});

// get all books
app.get("/books", (req, res) => {
  res.send(books);
});

//get books by id
app.get("/books/:book_id", (req, res) => {
  {
    //pair author info with corresponding books
    const book_id = req.params.book_id;
    //find book by id within its arr
    const selected = books.find((book) => book.id === book_id);
    //find author
    const bookAuthor = authors.find(
      (author) => author.id === selected.authorId
    );
    //desired data to be sent
    const prod = {
      id: selected.id,
      title: selected.title,
      description: selected.description,
      authorId: selected.authorId,
      name: bookAuthor.name,
      bio: bookAuthor.bio,
    };
    res.send(prod);
  }
});

// get all reviews
app.get("/reviews", (req, res) => {
  res.send(reviews);
});

//get reviews by id
app.get("/reviews/:review_id", (req, res) => {
  {
    //pair review for its book
    const review_id = req.params.review_id;
    //find review by id within its arr
    const selectedReview = reviews.find((review) => review.id === review_id);
    // pair book to review
    const selected = books.find((book) => book.id === selectedReview.bookId);
    //desired data to be sent
    const prod = {
      id: selectedReview.id,
      text: selectedReview.text,
      bookId: selected.id,
      book_title: selected.title,
    };
    res.send(prod);
  }
});

// get all authors
app.get("/authors", (req, res) => {
  res.send(authors);
});

//get authors by id
app.get("/authors/:author_id", (req, res) => {
  const author_id = req.params.author_id;
  const selected = authors.find((a) => a.id === author_id);
  res.send(selected);
});

app.listen(6969, () => {
  console.log("bookstore running @ http://localhost:6969");
});
