function TodoForm({ onAddTask }) {
    const [taskText, setTaskText] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setTaskText(taskText.trim());
        if (!taskText) return;
        onAddTask(taskText);
        setTaskText("");
    }

    return (
        <>
            <form className="todo-form">
                <input
                    type="text"
                    value={taskText}
                    className="todo-input"
                    placeholder="Add a new task..."
                    onChange={(e) => {
                        setTaskText(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="todo-btn-add"
                    onClick={handleSubmit}
                >
                    Add task
                </button>
            </form>
        </>
    );
}

let uniqId = 0;
function TodoListApp() {
    const [tasks, setTask] = React.useState([]);

    const addTask = (newTask) => {
        setTask([...tasks, { text: newTask, id: ++uniqId, completed: false }]);
    };

    const delTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => {
            if (task.id == taskId) return false;
            return true;
        });
        setTask(updatedTasks);
    };

    const statusChange = (taskId, isChecked) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id == taskId) {
                return { ...task, completed: isChecked };
            }
            return task;
        });
        setTask(updatedTasks);
    };

    const totalCount = tasks.length;
    const completedCount = tasks.filter((task) => task.completed).length;
    const remainingCount = totalCount - completedCount;

    return (
        <>
            <h1 className="todo-title">Todo List App</h1>
            <div className="todo-card">
                <TodoForm onAddTask={addTask} />

                <div className="todo-list">
                    {tasks.map((task) => {
                        return (
                            <div
                                key={task.id}
                                className={`todo-item ${task.completed ? "completed" : "incompleted"}`}
                            >
                                <input
                                    type="checkbox"
                                    className="todo-check"
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    onChange={(e) => {
                                        statusChange(task.id, e.target.checked);
                                    }}
                                />
                                <label htmlFor={`task-${task.id}`}>
                                    <span className="todo-text">
                                        {task.text}
                                    </span>
                                </label>
                                <button
                                    className="todo-btn-delete"
                                    onClick={(e) => {
                                        delTask(task.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="todo-stats">
                    <span>
                        Total: <strong>{totalCount}</strong> tasks
                    </span>
                    <span>
                        Completed: <strong>{completedCount}</strong> tasks
                    </span>
                    <span>
                        Remaining: <strong>{remainingCount}</strong> tasks
                    </span>
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<TodoListApp />);
