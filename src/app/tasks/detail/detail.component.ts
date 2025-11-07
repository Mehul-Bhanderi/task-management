import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../shared/services/task.service';
import { Task, TaskFile } from '../../shared/models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  loading = false;
  error: string | null = null;
  logs: any[] = [];
  showLogs = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadTask(id);
      }
    });
  }

  loadTask(id: string): void {
    this.loading = true;
    this.taskService.getTaskById(id).subscribe({
      next: (response) => {
        this.task = response.data as Task;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load task';
        this.loading = false;
      }
    });
  }

  loadLogs(): void {
    if (this.task) {
      this.taskService.getTaskLogs(this.task._id).subscribe({
        next: (response) => {
          this.logs = response.data || [];
        },
        error: (error) => {
          console.error('Failed to load logs', error);
        }
      });
    }
  }

  toggleLogs(): void {
    this.showLogs = !this.showLogs;
    if (this.showLogs && this.logs.length === 0) {
      this.loadLogs();
    }
  }

  editTask(): void {
    if (this.task) {
      this.router.navigate(['/tasks', this.task._id, 'edit']);
    }
  }

  deleteTask(): void {
    if (this.task && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task._id).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to delete task';
        }
      });
    }
  }

  downloadFile(file: TaskFile): void {
    window.open(`http://localhost:5000/${file.path}`, '_blank');
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace('-', '')}`;
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
