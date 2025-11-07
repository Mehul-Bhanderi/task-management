import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskResponse, TaskFilters } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: any, files?: File[] | FileList): Observable<TaskResponse> {
    const fd = this.buildFormData(task, files);
    return this.http.post<TaskResponse>(this.apiUrl, fd); // don't set Content-Type
  }

  updateTask(id: string, task: any, files?: File[] | FileList): Observable<TaskResponse> {
    const fd = this.buildFormData(task, files);
    return this.http.put<TaskResponse>(`${this.apiUrl}/${id}`, fd);
  }

  getTasks(filters: Partial<TaskFilters> = {}): Observable<TaskResponse> {
    let params = new HttpParams();
    if (filters.page) params = params.set('page', String(filters.page));
    if (filters.limit) params = params.set('limit', String(filters.limit));
    if (filters.priority) params = params.set('priority', filters.priority);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.dueDateFrom) params = params.set('dueDateFrom', filters.dueDateFrom);
    if (filters.dueDateTo) params = params.set('dueDateTo', filters.dueDateTo);
    if (filters.search) params = params.set('search', filters.search);
    if (filters.sort) params = params.set('sort', filters.sort);
    return this.http.get<TaskResponse>(this.apiUrl, { params });
  }

  getTaskById(id: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/${id}`);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTaskLogs(taskId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${taskId}/logs`);
  }

  // ---------- helpers ----------
  private buildFormData(task: any, files?: File[] | FileList): FormData {
    const fd = new FormData();

    if (task.title) fd.append('title', task.title);
    if (task.description !== undefined) fd.append('description', task.description);
    if (task.priority) fd.append('priority', task.priority);
    if (task.status) fd.append('status', task.status);

    // ensure ISO string for backend
    if (task.dueDate) fd.append('dueDate', new Date(task.dueDate).toISOString());

    // tags -> repeated fields tags[]
    const tags: string[] = Array.isArray(task.tags)
      ? task.tags
      : String(task.tags || '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);

    tags.forEach(t => fd.append('tags[]', t));

    // files
    if (files) {
      const arr: File[] = Array.isArray(files as any)
        ? (files as File[])
        : Array.from(files as FileList);
      arr.forEach(f => fd.append('files', f));
    }

    return fd;
  }
}
