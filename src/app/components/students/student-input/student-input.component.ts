import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { StudentService } from 'src/app/services/student.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-student-input',
  templateUrl: './student-input.component.html',
  styleUrls: ['./student-input.component.scss']
})
export class StudentInputComponent implements OnInit {
  fullnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]);

  scoreFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(4),
    Validators.max(10),
    Validators.min(0),
  ]);

  matcher = new MyErrorStateMatcher();

  minDate = new Date(1971, 0, 9);
  maxDate = new Date(2013, 30, 1);

  Fullname = '';
  Born = '';
  Score = '';

  newStudent: FormGroup;

  constructor(
    private studentService: StudentService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.reactiveForm();
  }

  /* Reactive form */
  reactiveForm() {
    this.newStudent = this.fb.group({
      Fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Born: ['', Validators.required],
      Score: ['', [Validators.required, Validators.maxLength(4), Validators.max(10), Validators.min(0)]],
    });
  }

  /* Date */
  date(e) {
    const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.newStudent.get('Born').setValue(convertDate, {
      onlyself: true
    });
  }

  onSubmit(form: NgForm) {
    this.studentService.addTodo(form.value.Fullname, form.value.Born, form.value.Score );
    this.resetForm();
  }

  resetForm() {
    this.newStudent.setValue({
      Fullname: [''],
      Born: [''],
      Score: [''],
    });
  }
}
