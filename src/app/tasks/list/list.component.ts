import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../shared/services/task.service';
import { Task, TaskFilters } from '../../shared/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error: string | null = null;

  filters: TaskFilters = {
    page: 1,
    limit: 10,
    priority: '',
    status: '',
    search: '',
    sort: '-createdAt'
  };

  pagination = {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  };

  priorityOptions = ['Low', 'Medium', 'High'];
  statusOptions = ['Pending', 'In-Progress', 'Completed'];
  sortOptions = [
    { label: 'Newest First', value: '-createdAt' },
    { label: 'Oldest First', value: 'createdAt' },
    { label: 'Priority High to Low', value: '-priority' },
    { label: 'Due Date (Soon)', value: 'dueDate' }
  ];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = null;

    this.taskService.getTasks(this.filters).subscribe({
      next: (response) => {
        this.tasks = Array.isArray(response.data) ? response.data : [];
        if (response.pagination) {
          this.pagination = response.pagination;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  onSearch(searchTerm: string): void {
    this.filters.search = searchTerm;
    this.filters.page = 1;
    this.loadTasks();
  }

  onFilterChange(): void {
    this.filters.page = 1;
    this.loadTasks();
  }

  onSortChange(sortValue: string): void {
    this.filters.sort = sortValue;
    this.loadTasks();
  }

  onPageChange(page: number): void {
    this.filters.page = page;
    this.loadTasks();
  }

  viewTask(taskId: string): void {
    this.router.navigate(['/tasks', taskId]);
  }

  editTask(taskId: string): void {
    this.router.navigate(['/tasks', taskId, 'edit']);
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to delete task';
        }
      });
    }
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace('-', '')}`;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
