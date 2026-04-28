import Button from '../UI/Button';

const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow rounded border-l-4 border-blue-500">
            <span className={task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-800'}>
                {task.title}
            </span>
            <div className="flex gap-2">
                <Button onClick={() => onToggle(task.id, task.status)}>
                    {task.status === 'Completed' ? 'Undo' : 'Done'}
                </Button>
                <Button variant="danger" onClick={() => onDelete(task.id)}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default TaskItem;