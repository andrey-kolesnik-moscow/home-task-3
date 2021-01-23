import React from 'react';
import TodoItem from './components/TodoItem';

const colors = ['grey', 'red', 'blue', 'orange', 'green'];

function App() {
  const [currentColor, setCurrentColor] = React.useState('grey');
  const [tasks, setTasks] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const textInput = React.useRef(null);
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    !firstRender.current
      ? localStorage.setItem('dataLesson3', JSON.stringify(tasks))
      : (firstRender.current = false);
  }, [tasks]);

  React.useEffect(() => {
    let localStorageData = JSON.parse(localStorage.getItem('dataLesson3'));

    for (let key in localStorageData) {
      if (localStorageData.hasOwnProperty(key) && typeof localStorageData === 'object') {
        setTasks(() => localStorageData);
        break;
      }
    }
  }, []);

  const addTask = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setTasks((prevValue) => {
        let id;
        if (tasks.length === 0) {
          id = 1;
        } else {
          id = tasks[tasks.length - 1].id + 1;
        }
        return [
          ...prevValue,
          {
            id,
            text: e.target.value,
            color: currentColor,
            completed: false,
          },
        ];
      });
      setInputValue('');
      setCurrentColor('grey');
      textInput.current.focus();
    }
  };

  function removeNote(id) {
    let result = window.confirm('Вы действительно хотите удалить эту запись?');
    if (result) {
      setTasks((prev) => prev.filter((item) => item.id !== id));
    }
  }

  function correctNote(id, text) {
    let newText = window.prompt('Откорректируйте задачу', text);
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          item.text = newText;
        }
        return item;
      }),
    );
  }

  function setComleted(id) {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      }),
    );
  }

  return (
    <div className="App">
      <div className="todo">
        <h2>Список задач</h2>
        {tasks.map((obj) => (
          <TodoItem
            key={obj.id}
            obj={obj}
            remove={removeNote}
            correct={correctNote}
            changeCompleted={setComleted}
          />
        ))}
        <div className="todo-input">
          <input
            type="text"
            placeholder="Текст задачи..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => addTask(e)}
            ref={textInput}
          />
          <ul>
            {colors.map((color) => (
              <li
                className={
                  color === currentColor ? `todo-color ${color} active` : `todo-color ${color}`
                }
                key={color}
                // color = {color}
                onClick={() => {
                  setCurrentColor(color);
                }}></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
