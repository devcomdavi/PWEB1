// src/app/components/button-add/button-add.ts
import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-button-add',
  standalone: true,
  templateUrl: './button-add.html'
})
export class ButtonAdd {
  // Injeção do serviço que gerencia as tarefas e o modal
  private taskService = inject(TaskService);

  abrirModal() {
    // Chamamos o método do serviço para abrir o formulário vazio (nova tarefa)
    this.taskService.openModal(null);
  }
}