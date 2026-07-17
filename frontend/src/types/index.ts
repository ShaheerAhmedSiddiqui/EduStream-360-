export type UserRole = 'admin' | 'student' | 'instructor' | 'doctor';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface StudentProfile {
  id: string;
  userId: string;
  studyGroup: string;
  User?: User;
}

export interface ScheduleItem {
  id: string;
  type: 'Quiz' | 'Assignment' | 'Lecture Video';
  topic: string;
  closing: string;
  group: string;
}