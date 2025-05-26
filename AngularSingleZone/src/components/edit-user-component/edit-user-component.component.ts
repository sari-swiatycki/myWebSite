
// import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatError, MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { Component, Inject } from '@angular/core';
// import { User } from '../../app/models/user';
// import { UserService } from '../../services/user.service';

// @Component({
//   selector: 'app-edit-user',
//   standalone: true,
//   imports: [MatDialogModule,
//     ReactiveFormsModule,MatFormFieldModule,MatDialogModule,
//     MatInputModule,
//     MatButtonModule,
//     MatFormFieldModule,
//     MatIconModule,MatError
//   ],
//   templateUrl: './edit-user.component.html',
//   styleUrl: './edit-user.component.css'
// })
// export class EditUserComponent {
//   editUserForm!: FormGroup;

//   constructor
//   (
    
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<EditUserComponent>,
//     private UserService: UserService,
//     @Inject(MAT_DIALOG_DATA) public data: { user: User } // מקבל את הקורס שנבחר לעדכון
    
//   ) {
    
//       console.log('✅ EditUserComponent נטען!');
//       console.log(this.data); 
    
    
//     this.editUserForm = this.fb.group({
//         usereGroup: this.fb.group({
//           userName: [this.data.user.userName, Validators.required],
          
//           email: [this.data.user.email, Validators.compose([Validators.required, Validators.email])],
//         }),
//         password: [this.data.user.password, Validators.required],  // הוסף את ה-password כאן
//       });
//   }

//   onNoClick(): void {
//     this.dialogRef.close(); // סוגר את המודל
//   }

//   onSubmit(): void {
//     console.log(this.editUserForm.value);
//     console.log("id:" + this.data.user.id);
  
//     if (this.editUserForm.valid) {
//       const updatedUser = {
//         userName: this.editUserForm.value.usereGroup.userName,
     
//         email: this.editUserForm.value.usereGroup.email,
//         password: this.editUserForm.value.password
//       };
//       this.UserService.updateUser(this.data.user.id, updatedUser).subscribe({
//         next: (response) => {
//           console.log('User updated successfully:', response);
//           this.dialogRef.close(true);
//         },
//         error: (err) => {
//           console.error('Error updating user:', err);
//           alert('Failed to update user');
//         }
//       });
//     }
//   }
// }



import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
 import { User } from '../../app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MatDialogModule,
    ReactiveFormsModule,MatFormFieldModule,MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  editUserForm!: FormGroup;

  constructor
  (
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private UserService: UserService,
    
    
    @Inject(MAT_DIALOG_DATA) public data: { user: User } // מקבל את הקורס שנבחר לעדכון
  ) {
    
    this.editUserForm = this.fb.group({
        usereGroup: this.fb.group({
          userName: [this.data.user.userName, Validators.required],
          email: [this.data.user.email, Validators.compose([Validators.required, Validators.email])],
        }),
        password: [this.data.user.password, Validators.required],  // הוסף את ה-password כאן
      });
  }

  onNoClick(): void {
   this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.editUserForm.value);
    console.log("id:" + this.data.user.id);
  
    if (this.editUserForm.valid) {
      const updatedUser = {
        userName: this.editUserForm.value.usereGroup.userName,
        email: this.editUserForm.value.usereGroup.email,
        password: this.editUserForm.value.password
      };
      this.UserService.updateUser(this.data.user.id, updatedUser).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error updating user:', err);
          alert('Failed to update user');
        }
      });
    }
  }
}
