// import { Component, OnInit } from "@angular/core";
// import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
// import { User } from "../../app/models/user";
// import { UserService } from "../../services/user.service";
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog } from '@angular/material/dialog';
// import { EditUserComponent } from "../edit-user-component/edit-user-component.component";



// @Component({
//   selector: 'app-show-users',
//   standalone: true,
//   imports: [RouterOutlet,MatCardModule, MatButtonModule,RouterLinkActive, RouterLink,MatButtonModule, MatIconModule],
//   templateUrl: './show-users.component.html',
//   styleUrl: './show-users.component.css'
// })
// export class ShowUsersComponent implements OnInit{
// constructor( private dialog: MatDialog,  private userService:UserService){
//   console.log('✅ EditUserComponent loaded!');
// }

// users:User[]=[]
// ngOnInit(): void {

//   this.userService.getUsers().subscribe({
//     next: (data) =>
//     {
//       this.users = data;
//       console.log(this.users); 
//     },
//     error: (error) => {
//       console.error('Error fetching courses:', error);
//     }
//   })

// }
// deleteUser(id:string){
//     this.userService.deleteUser(id).subscribe(
//       (response) => {
//         console.log('Course deleted successfully:', response);
//         this.users = this.users.filter(user => user.id !== id);

//       },
//       (error) => {
//         console.error('Error deleting course:', error);
//       }
//     );
//   }


//   editUser(user: User): void {
  
//     const dialogRef = this.dialog.open(EditUserComponent, {
//       data: { user }, // שולחים את הקורס למודל
//     });
//     console.log('📢 אחרי פתיחת הדיאלוג');

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         console.log('Course was updated successfully!');
//         this.getUsers();
//       }
//     });
//   }
//   getUsers(): void {
//     this.userService.getUsers().subscribe(data => {
//       this.users = data;
//     });
//   }

// }







import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../../app/models/user';
import { EditUserComponent } from '../edit-user-component/edit-user-component.component';
// import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component'; // Adjust the path as needed
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Adjust the path as needed
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';


@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [
    
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    DatePipe,
    MatDialogModule,          // ← תוסיף את זה
    
  ],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.css'
})
export class ShowUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  
  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {}
  
  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.filteredUsers = [...this.users];
        console.log('Users loaded:', this.users);
       
        
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      }
    });
  }
  
  filterUsers(): void {
    const search = this.searchText.toLowerCase().trim();
   
    if (!search) {
      this.filteredUsers = [...this.users];
      return;
    }
   
    this.filteredUsers = this.users.filter(user =>
      user.email.toLowerCase().includes(search) ||
      user.userName.toLowerCase().includes(search) 
    );
  }
  
  confirmDelete(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${user.userName}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user.id);
      }
    });
  }
  
  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.users = this.users.filter(user => user.id !== id);
        this.filterUsers(); // Refresh filtered list
      },
      error: (error: any) => {
        console.error('Error deleting user:', error);
      }
    });
  }
  
  editUser(user: User): void {
    alert('Trying to open dialog for: ' + user.userName);
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: { user }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User was updated successfully!');
        this.getUsers();
      }
    });
  }
  
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px',
      disableClose: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User was added successfully!');
        this.getUsers(); // Refresh the user list
      }
    });
  }
}
