import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.fetchFromLocalStorage();
  }

}
