import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private static readonly StudentStorageKey = 'students';
  private students: Student[];
  private displayStudentsSubject: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

  students$: Observable<Student[]> = this.displayStudentsSubject.asObservable();

  constructor(private storageService: LocalStorageService) { }

  updateToLocalStorage() {
    this.storageService.setObject(StudentService.StudentStorageKey, this.students);
    this.updateStudentsData();
  }

  addTodo(Fullname: string, Born: string, Score: string) {
    const date = new Date(Date.now()).getTime();
    const newStudent = new Student(date, Fullname, Born, Score);
    this.students.unshift(newStudent);
    this.updateToLocalStorage();
  }

  fetchFromLocalStorage() {
    this.students = this.storageService.getValue<Student[]>(StudentService.StudentStorageKey) || [];
    this.updateStudentsData();
  }

  deleteStudent(Id: number) {
    const index = this.students.findIndex(t => t.Id === Id);
    this.students.splice(index, 1);
    this.updateToLocalStorage();
  }

  editStudent(Id: number, Fullname: string, Born: string, Score: string) {
    const index = this.students.findIndex(t => t.Id === Id);
    const student = this.students[index];
    student.Fullname = Fullname;
    student.Born = Born;
    student.Score = Score;
    this.students.splice(index, 1, student);
    this.updateToLocalStorage();
  }

  private updateStudentsData() {
    this.displayStudentsSubject.next([...this.students]);
  }
}
