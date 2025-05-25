// import { Component, OnInit, inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { SongsService, SongDto, Categories } from '../../services/songs.service';

// @Component({
//   selector: 'app-songs-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './songs.component.html',
//   styleUrl: './songs.component.scss'
// })
// export class SongsListComponent implements OnInit {
//   private songsService = inject(SongsService);
//   private fb = inject(FormBuilder);

//   songs: SongDto[] = [];
//   filteredSongs: SongDto[] = [];
//   selectedSong: SongDto | null = null;
//   searchKeyword = '';
//   categories = Categories;
//   enumKeys = Object.keys(Categories).filter(key => !isNaN(Number(Categories[key as keyof typeof Categories])));
//   uploadForm: FormGroup;
//   isUploading = false;
//   uploadProgress = 0;
  
//   constructor() {
//     this.uploadForm = this.fb.group({
//       title: ['', Validators.required],
//       artistName: ['', Validators.required],
//       category: [Categories.Pop, Validators.required],
//       audioFile: [null, Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.loadAllSongs();
//   }

//   loadAllSongs(): void {
//     this.songsService.getAllSongs().subscribe({
//       next: (data) => {
//         this.songs = data;
//         this.filteredSongs = data;
//       },
//       error: (error) => {
//         console.error('Error loading songs:', error);
//       }
//     });
//   }

//   searchSongs(): void {
//     if (!this.searchKeyword.trim()) {
//       this.filteredSongs = this.songs;
//       return;
//     }
    
//     this.songsService.searchSongs(this.searchKeyword).subscribe({
//       next: (results) => {
//         this.filteredSongs = results;
//       },
//       error: (error) => {
//         console.error('Error searching songs:', error);
//       }
//     });
//   }

//   filterByCategory(event: Event): void {
//     const selectElement = event.target as HTMLSelectElement;
//     const category = Number(selectElement.value) as Categories;
    
//     if (category === undefined || category === null || isNaN(category)) {
//       this.filteredSongs = this.songs;
//       return;
//     }
    
//     this.songsService.getSongsByCategory(category).subscribe({
//       next: (response) => {
//         this.filteredSongs = response.worksheets;
//       },
//       error: (error) => {
//         console.error('Error filtering by category:', error);
//       }
//     });
//   }

//   selectSong(song: SongDto): void {
//     this.selectedSong = song;
//   }

//   rateSong(id: number | undefined, rating: number): void {
//     if (id === undefined) return;
    
//     this.songsService.rateSong(id, rating).subscribe({
//       next: () => {
//         // Update the rating in the local list
//         const song = this.songs.find(s => s.id === id);
//         if (song) {
//           if (!song.numberOfRatings) song.numberOfRatings = 0;
//           const totalRating = (song.rating || 0) * song.numberOfRatings;
//           song.numberOfRatings++;
//           song.rating = (totalRating + rating) / song.numberOfRatings;
//         }
//       },
//       error: (error) => {
//         console.error('Error rating song:', error);
//       }
//     });
//   }

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files[0]) {
//       this.uploadForm.patchValue({ audioFile: input.files[0] });
//     }
//   }

//   uploadSong(): void {
//     if (this.uploadForm.invalid) {
//       return;
//     }

//     const formValues = this.uploadForm.value;
//     const file = formValues.audioFile;

//     const songData = {
//       title: formValues.title,
//       artistName: formValues.artistName,
//       category: formValues.category,
//       audioUrl: '' // Will be set by the backend
//     };

//     this.isUploading = true;
    
//     this.songsService.uploadAndCreateSong(file, songData).subscribe({
//       next: (result) => {
//         this.isUploading = false;
//         this.uploadForm.reset();
//         this.loadAllSongs(); // Reload the songs list
//       },
//       error: (error) => {
//         console.error('Error uploading song:', error);
//         this.isUploading = false;
//       }
//     });
//   }

//   deleteSong(song: SongDto): void {
//     if (confirm(`Are you sure you want to delete "${song.title}"?`)) {
//       if (song.id && song.audioUrl) {
//         this.songsService.deleteCompleteSong(song.id, song.audioUrl).subscribe({
//           next: () => {
//             this.songs = this.songs.filter(s => s.id !== song.id);
//             this.filteredSongs = this.filteredSongs.filter(s => s.id !== song.id);
//             if (this.selectedSong?.id === song.id) {
//               this.selectedSong = null;
//             }
//           },
//           error: (error) => {
//             console.error('Error deleting song:', error);
//           }
//         });
//       }
//     }
//   }

//   getAudioUrl(song: SongDto): void {
//     if (song.audioUrl) {
//       this.songsService.getDownloadUrl(song.audioUrl).subscribe({
//         next: (url) => {
//           // Open the audio in a new tab or play it
//           window.open(url, '_blank');
//         },
//         error: (error) => {
//           console.error('Error getting download URL:', error);
//         }
//       });
//     }
//   }

//   // Helper for form control access in template
//   getFormControl(name: string) {
//     return this.uploadForm.get(name);
//   }

//   // Generate array for star rating display
//   generateStarArray(count: number): number[] {
//     return Array(count).fill(0).map((_, i) => i + 1);
//   }
// }