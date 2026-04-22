// src/app/app.ts
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './services/task';
import { Task } from './models/task.model';
import { TaskStatus } from './models/task.model';
import { ButtonAdd } from './components/button-add/button-add';
import { ModalForm } from './components/modal-form/modal-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ButtonAdd, ModalForm],
  templateUrl: './app.html'
})
export class App {
  taskService = inject(TaskService);

  // Computados usando Signals para separar as listas dinamicamente
  todoTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'todo'));
  doingTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'doing'));
  doneTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'done'));

  // Helpers visuais (Migrados das funções JS puras)
  levelLabel(level: string) {
    return level === 'high' ? 'Alta' : level === 'medium' ? 'Média' : 'Baixa';
  }

  proximityColor(dueISO: string) {
    const today = new Date();
    const due = new Date(dueISO);
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return 'bg-gray-500';
    if (diff <= 1) return 'bg-red-500';
    if (diff <= 3) return 'bg-orange-400';
    if (diff <= 7) return 'bg-yellow-300';
    return 'bg-green-400';
  }

  // Ações passadas para o Serviço
  editTask(task: Task) { this.taskService.openModal(task); }
  deleteTask(id: string) { this.taskService.deleteTask(id); }

  // Lógica de Drag & Drop migrada do JS
  onDragStart(event: DragEvent, id: string, target: HTMLElement) {
    event.dataTransfer?.setData('text/plain', id);
    target.classList.add('opacity-70');
  }

  onDragEnd(target: HTMLElement) {
    target.classList.remove('opacity-70');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Necessário para permitir o drop
  }

  onDrop(event: DragEvent, status: TaskStatus) {
    event.preventDefault();
    const id = event.dataTransfer?.getData('text/plain');
    if (id) {
      this.taskService.moveTaskTo(id, status);
    }
  }
}