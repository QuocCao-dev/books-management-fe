import { Button } from "@material-tailwind/react";
import BookList from "./components/BookList";
import TagForm from "./components/TagForm";
import BookForm from "./components/BookForm";
import { useEffect, useState } from "react";
import { TBook } from "./types/book";
import axiosClient from "./services/axios-client";
import { useLoading } from "./hooks/useLoading";

type FormType = "tag" | "book" | null;

function App() {
  const [selectedForm, setSelectedForm] = useState<FormType>("book");

  const [books, setBooks] = useState<TBook[]>([]);
  const [loading, { showLoading, hideLoading }] = useLoading();

  const fetchBooks = async () => {
    showLoading();
    const response = await axiosClient.get("/books");
    setBooks(response.data);
    hideLoading();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSelectForm = (form: FormType) => () => {
    setSelectedForm(form);
  };

  return (
    <div className="min-h-screen bg-blue-gray-200">
      <div className="container py-8 mx-auto space-y-4">
        <div className="flex gap-4">
          <Button color="blue" onClick={handleSelectForm("tag")}>
            Create New Tag
          </Button>
          <Button color="green" onClick={handleSelectForm("book")}>
            Create New Book
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <BookList books={books} loading={loading} />
          </div>
          <div className="col-span-4 space-y-2">
            {selectedForm === "tag" && (
              <TagForm onCancel={handleSelectForm(null)} />
            )}
            {selectedForm === "book" && (
              <BookForm
                onCancel={handleSelectForm(null)}
                onFetchBooks={fetchBooks}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
