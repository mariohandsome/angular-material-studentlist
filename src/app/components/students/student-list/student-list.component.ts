import { Student } from './../../../models/student.model';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { StudentService } from 'src/app/services/student.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    public fb: FormBuilder
  ) { }
  students: Student[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Id', 'Fullname', 'Born', 'Score', 'Del'];
  studentName: FormGroup;
  isEditing = false;
  ngOnInit() {
    this.studentService.students$.subscribe(res => {
      this.students = res;
      this.dataSource = new MatTableDataSource(this.students);
    });
    this.reactiveFormName();
  }

  /* Reactive form */
  reactiveFormName() {
    this.studentName = this.fb.group({
      Id: ['', [Validators.required]],
      Fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Born: ['', Validators.required],
      Score: ['', [Validators.required, Validators.maxLength(4), Validators.max(10), Validators.min(0)]]
    });
  }

  /* Date */
  date(e) {
    const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentName.get('Born').setValue(convertDate, {
      onlyself: true
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeStudent(student: Student) {
    this.studentService.deleteStudent(student.Id);
  }

  editStudentName(form: NgForm, student: Student) {
    student.Fullname = form.value.Fullname;
    this.studentService.editStudent(student.Id, student.Fullname, student.Born, student.Score);
    this.isEditing = false;
  }

  editStudentBorn(form: NgForm, student: Student) {
    student.Born = form.value.Born;
    this.studentService.editStudent(student.Id, student.Fullname, student.Born, student.Score);
    this.isEditing = false;
  }

  editStudentScore(form: NgForm, student: Student) {
    student.Score = form.value.Score;
    this.studentService.editStudent(student.Id, student.Fullname, student.Born, student.Score);
    this.isEditing = false;
  }
}
