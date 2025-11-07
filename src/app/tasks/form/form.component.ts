import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  loading = false;
  submitted = false;
  error: string | null = null;
  isEditing = false;
  taskId: string | null = null;
  selectedFiles: File[] = [];
  currentTask: Task | null = null;

  priorityOptions = ['Low', 'Medium', 'High'];
  statusOptions = ['Pending', 'In-Progress', 'Completed'];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: ['', [Validators.required]],
      priority: ['Medium'],
      status: ['Pending'],
      tags: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id');
      if (this.taskId) {
        this.isEditing = true;
        this.loadTask(this.taskId);
      }
    });
  }

  loadTask(id: string): void {
    this.taskService.getTaskById(id).subscribe({
      next: (response) => {
        this.currentTask = response.data as Task;
        this.populateForm(this.currentTask);
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load task';
      }
    });
  }

  populateForm(task: Task): void {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate).toISOString().split('T')[0],
      priority: task.priority,
      status: task.status,
      tags: task.tags?.join(', ') || ''
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;

    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.taskForm.value;
    const tagsArray = formValue.tags
      ? formValue.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t)
      : [];

    const taskData = {
      ...formValue,
      tags: tagsArray,
      dueDate: new Date(formValue.dueDate).toISOString()
    };

    const fileList = this.selectedFiles.length > 0 ? this.selectedFiles : null;

    if (this.isEditing && this.taskId) {
      this.taskService.updateTask(this.taskId, taskData, this.selectedFiles as any).subscribe({
        next: () => {
          this.router.navigate(['/tasks', this.taskId]);
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to update task';
          this.loading = false;
        }
      });
    } else {
      this.taskService.createTask(taskData, this.selectedFiles as any).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to create task';
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
