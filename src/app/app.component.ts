import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentServiceService } from './student-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  studentForm!: FormGroup;

  students: any[] = []; // Array to hold student data
  isEditMode!: boolean;
  currentEditId!: number;

  constructor(private fb: FormBuilder, private student: StudentServiceService) { }

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
    const formData = this.studentForm.value;

    if (this.isEditMode && this.currentEditId !== null) {
      // UPDATE
      this.student.updateStudent(this.currentEditId, formData).subscribe(() => {
        console.log('✅ Student updated:', formData);
        this.getStudents();
        this.studentForm.reset();
        this.isEditMode = false;
        this.currentEditId = 0;
      }, error => {
        console.error('❌ Error updating student:', error);
      });
    } else {
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
      this.students.splice(index, 1);
      alert(`Student with ID ${id} deleted.`);
    } else {
      alert(`Student with ID ${id} not found.`);
    }
  }

  getStudents() {
    this.student.getStudents().subscribe((data: any) => {
      this.students = data;
      console.log('✅ Students fetched:', this.students);
    }, error => {
      console.error('❌ Error fetching students:', error);
    });
  }

 
updateStudent(id: number) {
  const student = this.students.find(s => s.id === id);
  if (student) {
    this.isEditMode = true;
    this.currentEditId = id;

    this.studentForm.patchValue({
      Name: student.Name,
      id: student.id,
      RollNo: student.RollNo,
      EmailId: student.EmailId,
      PhoneNumber: student.PhoneNumber
    });
  }
}


}
