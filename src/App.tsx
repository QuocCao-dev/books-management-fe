import { Button } from "@material-tailwind/react";
import BookList from "./components/BookList";
import TagForm from "./components/TagForm";
import BookForm from "./components/BookForm";
import { useEffect, useState } from "react";
import cn from "clsx";
import { TBook } from "./types/book";
import axiosClient from "./services/axios-client";
import { useLoading } from "./hooks/useLoading";
import useBookStore from "./stores/book";
import useFormModalStore, { FormType } from "./stores/form-modal";

function App() {
  const [books, setBooks] = useState<TBook[]>([]);
  const [loading, { showLoading, hideLoading }] = useLoading();

  const { selectedBook } = useBookStore();
  const { form, setForm } = useFormModalStore();

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
    setForm(form);
  };

  const handleCloseBookForm = () => {
    setForm(null);
  };

  const handleDeleteBook = async (book: TBook) => {
    await axiosClient.delete(`/books/${book.id}`);
    fetchBooks();
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
          <div className={cn(form ? "col-span-8" : "col-span-12")}>
            <BookList books={books} loading={loading} />
          </div>
          <div className="col-span-4 space-y-2">
            {form === "tag" && <TagForm onCancel={handleSelectForm(null)} />}
            {form === "book" && (
              <BookForm
                onCancel={handleSelectForm(null)}
                onFetchBooks={fetchBooks}
                book={selectedBook}
                onClose={handleCloseBookForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
