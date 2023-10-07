import { Button } from "@material-tailwind/react";
import BookList from "./components/BookList";
import TagForm from "./components/TagForm";
import BookForm from "./components/BookForm";

function App() {
  return (
    <div className="min-h-screen bg-blue-gray-200">
      <div className="container py-8 mx-auto space-y-4">
        <div className="flex gap-4">
          <Button color="blue">Create New Tag</Button>
          <Button color="green">Create New Book</Button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <BookList />
          </div>
          <div className="col-span-4 space-y-2">
            <TagForm />
            <BookForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
