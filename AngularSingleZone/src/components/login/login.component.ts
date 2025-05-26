import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatError,  } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,MatIconModule,
    MatCardModule,  MatError,
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule,
      MatIconModule,
      MatCardModule,
      CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  addUserForm!: FormGroup;
  errormessage: string = '';  // משתנה לשמירת השגיאה
  showError: boolean = false;  // משתנה לניהול הצגת השגיאה

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}
  hide = true;

  ngOnInit(): void {
    
    this.addUserForm = this.fb.group({
      userName: ['',Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    })
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const { userName, password } = this.addUserForm.value; // אין יותר userGroup
  
      this.authservice.login(userName, password).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
          sessionStorage.setItem('token', response.token);
          // sessionStorage.setItem('userId', response.user.id);
          console.log("user", response);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          if (err.status === 400) {
            this.errormessage = 'Invalid credentials';
          } else if (err.status === 401) {
            this.errormessage = 'only admin can login';
          } else {
            console.log("err.status", err.status);
            this.errormessage = 'An unexpected error occurred';
          }
          this.showError = true;
        }
      });
    } else {
      this.errormessage = 'Please fill in all fields correctly.';
      this.showError = true;
    }
  }
  
}