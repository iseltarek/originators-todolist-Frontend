export interface Note {
  status: string;
  tags: string[] | null;
  description: string;
  customId: number;
  title: string;
  dueDate: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
