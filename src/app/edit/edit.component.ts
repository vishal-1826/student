import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentServiceService } from '../student-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
 studentForm!: FormGroup;
 students: any[] = [];
 isEditMode!: boolean;
  currentEditId!: number;
  constructor(private fb: FormBuilder,private student: StudentServiceService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
     this.studentForm = this.fb.group({
       Name: ['', Validators.required],
       id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
       RollNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
       EmailId: ['', [Validators.required, Validators.email]],
       PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
     });
    this.route.params.subscribe(params => {
    this.currentEditId = params['id'];
    if (this.currentEditId) {
      this.student.getStudentById(this.currentEditId).subscribe((student: any) => {
        if (student) {
          this.studentForm.patchValue({
            Name: student.Name,
            id: student.id,
            RollNo: student.RollNo,
            EmailId: student.EmailId,
            PhoneNumber: student.PhoneNumber
          });
          this.isEditMode = true;
        }
      });
    }
  });
}

 onSubmit() {
  this.currentEditId = this.route.snapshot.params['id'];
  console.log('Form submitted:', this.studentForm.value, this.currentEditId);

  if (this.studentForm.valid) {
    const formData = this.studentForm.value;
    console.log('Form data:', formData);
    if (this.isEditMode === true) {
      // UPDATE
      this.student.updateStudent(this.currentEditId, formData).subscribe(() => {
        console.log('✅ Student updated:', formData, this.currentEditId);
         this.getStudents();
         this.studentForm.reset();
        this.router.navigate(['']); // Navigate back to main list after update
      });
    }
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