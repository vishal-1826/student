import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  url = 'http://localhost:3000/students'; // Update with your API endpoint
  constructor(private http: HttpClient) { }
private studentChanged= new Subject<void>();
  studentChanged$ = this.studentChanged.asObservable();

  notifyStudentChange() {
    this.studentChanged.next();
  }
  getStudents() {
    return this.http.get(this.url);
  }
  addStudent(student: any) {
    return this.http.post(this.url, student);
  }
  updateStudent(id: number, student: any) {
    return this.http.put(`${this.url}/${id}`, student);
  }
  deleteStudent(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getStudentById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
}
