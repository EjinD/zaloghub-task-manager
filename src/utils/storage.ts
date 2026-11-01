
import type { Task } from '../types/task';

const STORAGE_KEY = 'focus-tasks';

export function loadTasks(): Task[] {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return [];
    }

    const parsedData: unknown = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData.filter(
      (item): item is Task =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.title === 'string' &&
        item.title.trim().length > 0 &&
        item.title.length <= 200 &&
        typeof item.completed === 'boolean' &&
        typeof item.createdAt === 'number' &&
        Number.isFinite(item.createdAt),

    );
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks),
    );
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
}
