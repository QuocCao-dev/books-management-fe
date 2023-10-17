import { Button } from "@material-tailwind/react";
import cn from "clsx";
import { useEffect } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import TagForm from "./components/TagForm";
import { useBooks } from "./hooks/useBooks";
import useBookStore from "./stores/book";
import useFormModalStore, { FormType } from "./stores/form-modal";
import { If, Then, Switch, Case } from "react-if";

function App() {
  const { books, fetchBooks } = useBooks();
  const { selectedBook } = useBookStore();
  const { form, setForm } = useFormModalStore();

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSelectForm = (form: FormType) => () => {
    setForm(form);
  };

  const handleCloseBookForm = () => {
    setForm(null);
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
            <BookList books={books} />
          </div>
          <div className="col-span-4 space-y-2">
            <Switch>
              <Case condition={form === "tag"}>
                <TagForm onCancel={handleSelectForm(null)} />
              </Case>
              <Case condition={form === "book"}>
                <BookForm
                  onCancel={handleSelectForm(null)}
                  book={selectedBook}
                  onClose={handleCloseBookForm}
                />
              </Case>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
