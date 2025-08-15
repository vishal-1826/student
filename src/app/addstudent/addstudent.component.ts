import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentServiceService } from '../student-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstudent',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
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
        // this.getStudents(); // Fetch students on initialization
}

onSubmit() {
  if (this.studentForm.valid) {
    const formData = this.studentForm.value; {
      // ADD
      this.student.addStudent(formData).subscribe(() => {
        console.log('✅ Student added:', formData);
        this.student.notifyStudentChange(); // Notify other components about the change
        this.router.navigate(['/']); // Navigate back to the student list
        this.getStudents();
        this.studentForm.reset();
      });
    }
  } else {
    console.warn('⚠️ Form is invalid');
  }
}

getStudents() {
    this.student.getStudents().subscribe((data: any) => {
      this.students = data;
    }, error => {
      console.error('❌ Error fetching students:', error);
    });
  }
}