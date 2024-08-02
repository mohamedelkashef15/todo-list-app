import { Check } from "lucide-react";

interface IItem {
  id: number;
  description: string;
  selected: boolean;
}

const tempData = [
  { id: 1, description: "Create a JavaScript Project", selected: false },
  { id: 2, description: "Upload it online", selected: true },
];

function App() {
  return (
    <main id="main">
      <div className="container">
        <div className="todo-app">
          <h1>To-Do List 📝</h1>
          <Form />
          <ListItems />
        </div>
      </div>
    </main>
  );
}

function Form() {
  return (
    <form className="form">
      <div className="form-control">
        <input type="text" placeholder="Add your task" />
        <button className="btn-add">Add</button>
      </div>
    </form>
  );
}

function ListItems() {
  return (
    <ul className="list-items">
      {tempData.map((item) => (
        <Item id={item.id} description={item.description} key={item.id} selected={item.selected} />
      ))}
    </ul>
  );
}

function Item({ id, description, selected }: IItem) {
  return (
    <li className="list-item">
      <div>
        <label className="custom-checkbox">
          <input type="checkbox" />
          {selected ? <Check size={16} color="#ffffff" /> : <span className="checkmark"></span>}
        </label>
        <span className={`description ${selected && "selected"}`}>{description}</span>
      </div>
      <button className="btn-close">&times;</button>
    </li>
  );
}

export default App;
