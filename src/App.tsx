import { Button } from "@material-tailwind/react";
import BookList from "./components/BookList";
import TagForm from "./components/TagForm";
import BookForm from "./components/BookForm";
import { useState } from "react";

type FormType = "tag" | "book" | null;

function App() {
  const [selectedForm, setSelectedForm] = useState<FormType>(null);

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
            <BookList />
          </div>
          <div className="col-span-4 space-y-2">
            {selectedForm === "tag" && (
              <TagForm onCancel={handleSelectForm(null)} />
            )}
            {selectedForm === "book" && (
              <BookForm onCancel={handleSelectForm(null)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
