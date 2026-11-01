import { useEffect, useReducer } from 'react';

import type { Task } from '../types/task';
import { initialTaskState, taskReducer } from '../reducers/taskReducer';
import { loadTasks, saveTasks } from '../utils/storage';

function initializeTasks() {
  return {
    ...initialTaskState,
    tasks: loadTasks(),
  };
}

export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, undefined, initializeTasks);

  useEffect(() => {
    saveTasks(state.tasks);
  }, [state.tasks]);

  function addTask(title: string) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || trimmedTitle.length > 200) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      completed: false,
      createdAt: Date.now(),
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
  }

  function deleteTask(id: string) {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }

  function toggleTask(id: string) {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }

  function updateTask(id: string, title: string) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || trimmedTitle.length > 200) return;

    dispatch({ type: 'UPDATE_TASK', payload: { id, title: trimmedTitle } });
  }

  function setFilter(filter: 'all' | 'active' | 'completed') {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }

  return {
    tasks: state.tasks,
    activeFilter: state.filter,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    setFilter,
  };
}
