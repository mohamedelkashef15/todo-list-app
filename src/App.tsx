import { Check } from "lucide-react";
import { useEffect, useState } from "react";

interface IItem {
  id: number;
  description: string;
  selected: boolean;
  onDeleteItem?: (id: number) => void;
  onToggleItem?: (id: number) => void;
}

interface IListItems {
  items: IItem[];
  onDeleteItem: (val: number) => void;
  onToggleItem: (val: number) => void;
}

interface IForm {
  description: string;
  setDescription: (val: string) => void;
  onAddItem: (val: IItem) => void;
}

function App() {
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<IItem[]>(() => {
    // Load items from local storage or initialize to an empty array
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save items to local storage whenever items change
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function handleAddItem(item: IItem) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id: number) {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
  }

  return (
    <main id="main">
      <div className="container">
        <div className="todo-app">
          <h1>To-Do List 📝</h1>
          <Form description={description} setDescription={setDescription} onAddItem={handleAddItem} />
          <ListItems items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
        </div>
      </div>
    </main>
  );
}

function Form({ description, setDescription, onAddItem }: IForm) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!description) {
      return alert("You must type something");
    }

    const newItem = {
      id: Date.now(),
      description,
      selected: false,
    };
    onAddItem(newItem);

    setDescription("");
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Add your task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn-add">Add</button>
      </div>
    </form>
  );
}

function ListItems({ items, onDeleteItem, onToggleItem }: IListItems) {
  return (
    <ul className="list-items">
      {items.map((item) => (
        <Item
          id={item.id}
          description={item.description}
          key={item.id}
          selected={item.selected}
          onDeleteItem={onDeleteItem}
          onToggleItem={onToggleItem}
        />
      ))}
    </ul>
  );
}

function Item({ id, description, selected, onDeleteItem, onToggleItem }: IItem) {
  return (
    <li className="list-item">
      <div>
        <label className="custom-checkbox">
          <input type="checkbox" onClick={() => onToggleItem && onToggleItem(id)} />
          {selected ? <Check size={16} color="#ffffff" /> : <span className="checkmark"></span>}
        </label>
        <span className={`description ${selected && "selected"}`}>{description}</span>
      </div>
      <button className="btn-close" onClick={() => onDeleteItem && onDeleteItem(id)}>
        &times;
      </button>
    </li>
  );
}

export default App;
