import type { Task, TaskFilter } from '../types/task';

export type TaskState = {
  tasks: Task[];
  filter: TaskFilter;
};

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'RESTORE_TASK';
    payload: {
      task: Task;
      index: number;
    }
  }
  | {
      type: 'UPDATE_TASK';
      payload: { id: string; title: string };
    }
  | { type: 'SET_FILTER'; payload: TaskFilter };

export const initialTaskState: TaskState = {
  tasks: [],
  filter: 'all',
};

export function taskReducer(
  state: TaskState,
  action: TaskAction,
): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload,
        ),
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task,
        ),
      };
      case 'RESTORE_TASK': {
        const { task, index } = action.payload;

        const updatedTasks = [...state.tasks];

        updatedTasks.splice(index, 0, task);

        return {
          ...state,
          tasks: updatedTasks,
        };
      }

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}
