import '../dist/styles.css';

import SideBar from './apps/SideBar';
import TodoApp from './apps/TodoApp';

export default function App() {
  return <div className="app">
    <SideBar />
    {/* <TodoApp /> */}
  </div>
}