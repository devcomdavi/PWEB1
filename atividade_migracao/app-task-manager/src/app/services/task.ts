// src/app/services/task.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { TaskStatus, Task, TaskLevel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Base de dados inicial exportada usando Signal
  tasks = signal<Task[]>([
    { id: this.uid(), title: 'Ler capítulo 3 de Algoritmos', due: this.addDaysISO(2), level: 'high', desc: 'Priorizar exercícios 3.1-3.5', status: 'todo' },
    { id: this.uid(), title: 'Resolver lista de TS', due: this.addDaysISO(5), level: 'medium', desc: 'Atenção a generics', status: 'doing' },
    { id: this.uid(), title: 'Revisão rápida: HTML/CSS', due: this.addDaysISO(10), level: 'low', desc: '30 minutos', status: 'done' }
  ]);

  // Signals para controlar o estado do Modal
  isModalOpen = signal<boolean>(false);
  taskToEdit = signal<Task | null>(null);

  // Helpers
  private uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
  private addDaysISO(n: number) {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }

  // Ações do Banco de Dados
  saveTask(taskData: Partial<Task>) {
    if (taskData.id) {
      // Editar existente
      this.tasks.update(tasks => tasks.map(t => t.id === taskData.id ? { ...t, ...taskData } as Task : t));
    } else {
      // Criar nova
      const newTask: Task = {
        id: this.uid(),
        title: taskData.title!,
        due: taskData.due!,
        level: taskData.level as TaskLevel,
        desc: taskData.desc || '',
        status: 'todo'
      };
      this.tasks.update(tasks => [...tasks, newTask]);
    }
  }

  deleteTask(id: string) {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));
  }

  moveTaskTo(id: string, newStatus: TaskStatus) {
    this.tasks.update(tasks => tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  }

  // Ações do Modal
  openModal(task: Task | null = null) {
    this.taskToEdit.set(task);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.taskToEdit.set(null);
  }
}