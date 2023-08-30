import { useCallback, useReducer, useRef } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

const createBulkTodos = () => {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({ id: i, text: `할 일 ${i}`, checked: false });
  }
  return array;
};

const todoReducer = (todos, action) => {
  switch (action.type) {
    case 'INSERT':
      return [action.todo, ...todos];
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(
    todoReducer,
    undefined,
    createBulkTodos,
    // [
    // { id: 1, text: '리액트의 기초 알아보기', checked: true },
    // { id: 2, text: '컴포넌트 스타일링 해보기', checked: true },
    // { id: 3, text: '일정관리 앱 만들기', checked: false },]
  );

  const nextId = useRef(2501);

  const onInsert = useCallback(text => {
    const todo = { id: nextId.current, text, checked: false };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(id => dispatch({ type: 'REMOVE', id }), []);

  const onToggle = useCallback(id => dispatch({ type: 'TOGGLE', id }), []);

  // const onInsert = useCallback(
  //   text => {
  //     const todo = { id: nextId.current, text, checked: false };
  //     // setTodos(todos.concat(todo));
  //     setTodos(todos => [todo, ...todos]);
  //     nextId.current += 1;
  //   },
  //   [todos],
  // );

  // const onRemove = useCallback(
  //   id => {
  //     setTodos(todos => todos.filter(todo => todo.id !== id));
  //   },
  //   [todos],
  // );

  // const onToggle = useCallback(
  //   id => {
  //     setTodos(todos =>
  //       todos.map(todo =>
  //         todo.id === id ? { ...todo, checked: !todo.checked } : todo,
  //       ),
  //     );
  //   },
  //   [todos],
  // );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList onRemove={onRemove} onToggle={onToggle} todos={todos} />
    </TodoTemplate>
  );
};

export default App;
