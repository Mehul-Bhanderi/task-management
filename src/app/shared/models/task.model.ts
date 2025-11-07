export interface TaskFile {
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimetype: string;
  uploadedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In-Progress' | 'Completed';
  tags: string[];
  files: TaskFile[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  page?: number;
  limit?: number;
  priority?: string;
  status?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
  search?: string;
  sort?: string;
}

export interface TaskResponse {
  success: boolean;
  data: Task | Task[];
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
