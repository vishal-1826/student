import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentServiceService } from './student-service.service';
import { Router, RouterOutlet } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet,ReactiveFormsModule,EditComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  studentForm!: FormGroup;

  students: any[] = []; // Array to hold student data
  isEditMode!: boolean;
  currentEditId!: number;

  constructor(private fb: FormBuilder, private student: StudentServiceService, private router:Router) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      Name: ['', Validators.required],
      id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      RollNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      EmailId: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
    this.getStudents(); // Fetch students on initialization
  }

 onSubmit() {
  if (this.studentForm.valid) {
    const formData = this.studentForm.value; {
      // ADD
      this.student.addStudent(formData).subscribe(() => {
        console.log('✅ Student added:', formData);
        this.getStudents();
        this.studentForm.reset();
      });
    }
  } else {
    console.warn('⚠️ Form is invalid');
  }
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

  // const student = this.students.find(s => s.id === id);
  // if (student) {
  //   this.isEditMode = true;
  //   this.currentEditId = id;

  //   this.studentForm.patchValue({
  //     Name: student.Name,
  //     id: student.id,
  //     RollNo: student.RollNo,
  //     EmailId: student.EmailId,
  //     PhoneNumber: student.PhoneNumber
  //   });
  }
}



