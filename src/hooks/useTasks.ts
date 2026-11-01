import { useEffect, useReducer, useRef, useState } from 'react';

import type { Task } from '../types/task';
import { initialTaskState, taskReducer } from '../reducers/taskReducer';
import { loadTasks, saveTasks } from '../utils/storage';

export type DeletedTask = {
  task: Task;
  index: number;
};

function initializeTasks() {
  return {
    ...initialTaskState,
    tasks: loadTasks(),
  };
}


export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, undefined, initializeTasks);

  const [recentlyDeletedTask, setRecentlyDeletedTask] =
    useState<DeletedTask | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    saveTasks(state.tasks);
  }, [state.tasks]);

  useEffect(() => {
  return () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
  };
}, []);

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
    const index = state.tasks.findIndex((task) => task.id === id);

    if (index === -1) return;

    const deletedTask = state.tasks[index];

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    dispatch({ type: 'DELETE_TASK', payload: id });

    setRecentlyDeletedTask({
      task: deletedTask,
      index,
    });

    timerRef.current = setTimeout(() => {
      setRecentlyDeletedTask(null);
      timerRef.current = null;
    }, 5000);
  }

    function undoDelete() {
    if (!recentlyDeletedTask) return;

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    dispatch({
      type: 'RESTORE_TASK',
      payload: recentlyDeletedTask,
    });

    setRecentlyDeletedTask(null);
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
    recentlyDeletedTask,
    undoDelete,
  };
}
