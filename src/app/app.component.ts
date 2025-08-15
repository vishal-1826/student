import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentServiceService } from './student-service.service';
import { Router, RouterOutlet } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { startWith } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet,ReactiveFormsModule,EditComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  studentForm!: FormGroup;
  students: any[] = []; // Array to hold student data
  isEditMode!: boolean;
  currentEditId!: number;

  constructor(private student: StudentServiceService, private router:Router) { }

  ngOnInit(): void {
     this.student.studentChanged$
    .pipe(startWith(null)) // Triggers the subscription immediately on init
    .subscribe(() => {
      this.getStudents(); // Fetch and refresh the student list
    });
  }

  onDelete(id: number) {
    const index = this.students.findIndex(s => s.id === +id);
    if (index > -1) {
      
      this.student.deleteStudent(id).subscribe(()=>{
       
        this.students.splice(index, 1);
        alert(`Student with ID ${id} deleted.`); 
      })
      
    } else {
      alert(`Student with ID ${id} not found.`);
    }
  }

  getStudents() {
    this.student.getStudents().subscribe((data: any) => {
      this.students = data;
    }, error => {
      console.error('❌ Error fetching students:', error);
    });
  }

 
updateStudent(id: number) {
  this.isEditMode = true;
  this.router.navigate(['edit', id]);
  }

  addStudent() {
    
    this.router.navigate(['addstudent']);
  }
  trackById(index: number, student: any): number {
    return student.id;
  }
}



