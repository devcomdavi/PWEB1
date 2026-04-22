// src/app/components/modal-form/modal-form.ts
import { Component, inject, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { TaskLevel } from '../../models/task.model';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-form.html'
})
export class ModalForm {
  taskService = inject(TaskService);

  // Variáveis para fazer o binding com o formulário HTML
  taskId: string | null = null;
  title = '';
  due = '';
  level: TaskLevel = 'low';
  desc = '';

  constructor() {
    // Esse effect reage toda vez que o sinal taskToEdit for alterado (para preencher edição)
    effect(() => {
      const task = this.taskService.taskToEdit();
      if (task) {
        this.taskId = task.id;
        this.title = task.title;
        this.due = task.due;
        this.level = task.level;
        this.desc = task.desc;
      } else {
        this.resetForm();
      }
    });
  }

  fecharModal() {
    this.taskService.closeModal();
  }
  
  onSubmit() {
    if (!this.title || !this.due) return;

    this.taskService.saveTask({
      id: this.taskId || undefined,
      title: this.title,
      due: this.due,
      level: this.level,
      desc: this.desc
    });
    
    this.taskService.closeModal();
    this.resetForm();
  }

  resetForm() {
    this.taskId = null;
    this.title = '';
    this.due = '';
    this.level = 'low';
    this.desc = '';
  }
}