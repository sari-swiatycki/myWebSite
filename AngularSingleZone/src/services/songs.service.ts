// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';


// // Models based on your backend DTOs
// export interface SongDto {
//   id?: number;
//   title: string;
//   artistName: string;
//   audioUrl: string;
//   pictureUrl?: string;
//   category: Categories;
//   duration?: number;
//   rating?: number;
//   numberOfRatings?: number;
// }

// export enum Categories {
//   Pop = 0,
//   Rock = 1,
//   HipHop = 2,
//   Classical = 3,
//   Electronic = 4,
//   Jazz = 5,
//   Folk = 6,
//   Other = 7
// }

// export interface SongPostModel {
//   title: string;
//   artistName: string;
//   audioUrl: string;
//   category: Categories;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class SongsService {
//   private readonly apiUrl = "http://localhost:5120"
//   private readonly songsUrl = `${this.apiUrl}/api/Songs`;
//   private readonly uploadUrl = `${this.apiUrl}/api/upload`;

//   constructor(private http: HttpClient) { }

//   // Get all songs
//   getAllSongs(): Observable<SongDto[]> {
//     return this.http.get<SongDto[]>(this.songsUrl);
//   }

//   // Get song by ID
//   getSongById(id: number): Observable<SongDto> {
//     return this.http.get<SongDto>(`${this.songsUrl}/${id}`);
//   }

//   // Get songs by category
//   getSongsByCategory(category: Categories): Observable<{ worksheets: SongDto[] }> {
//     return this.http.get<{ worksheets: SongDto[] }>(`${this.songsUrl}/ByCategory/${category}`);
//   }

//   // Search songs by keyword
//   searchSongs(keyword: string): Observable<SongDto[]> {
//     return this.http.get<SongDto[]>(`${this.songsUrl}/Search/${keyword}`);
//   }

//   // Add new song
//   addSong(song: SongPostModel): Observable<SongDto> {
//     return this.http.post<SongDto>(this.songsUrl, song);
//   }

//   // Update song
//   updateSong(id: number, song: SongPostModel): Observable<boolean> {
//     return this.http.put<boolean>(`${this.songsUrl}/${id}`, song);
//   }

//   // Delete song (from DB)
//   deleteSong(id: number): Observable<boolean> {
//     return this.http.delete<boolean>(`${this.songsUrl}/${id}`);
//   }

//   // Rate a song
//   rateSong(id: number, rating: number): Observable<any> {
//     return this.http.post(`${this.songsUrl}/Rate/${id}`, rating);
//   }

//   // Upload related methods
  
//   // Get presigned URL for uploading to S3
//   getPresignedUrl(fileName: string): Observable<{ url: string }> {
//     const params = new HttpParams().set('fileName', fileName);
//     return this.http.get<{ url: string }>(`${this.uploadUrl}/presigned-url`, { params });
//   }

//   // Get download URL for a file
//   getDownloadUrl(fileName: string): Observable<string> {
//     return this.http.get(`${this.uploadUrl}/download-url/${fileName}`, { responseType: 'text' });
//   }

//   // Delete file from S3
//   deleteFileFromS3(fileName: string): Observable<any> {
//     return this.http.delete(`${this.uploadUrl}/${fileName}`);
//   }

//   // Save song metadata after upload
//   saveSongMetadata(songDto: SongDto): Observable<any> {
//     return this.http.post(`${this.uploadUrl}/save-song`, songDto);
//   }

//   // Complete upload and create song - this combines multiple operations
//   uploadAndCreateSong(file: File, songData: SongPostModel): Observable<any> {
//     // This is a multi-step process:
//     // 1. Get presigned URL
//     // 2. Upload file to S3 using the URL
//     // 3. Save song metadata
    
//     return new Observable(observer => {
//       this.getPresignedUrl(file.name).subscribe({
//         next: (response) => {
//           // Upload file to S3 using the presigned URL
//           const xhr = new XMLHttpRequest();
//           xhr.open('PUT', response.url, true);
//           xhr.setRequestHeader('Content-Type', file.type);
          
//           xhr.onload = () => {
//             if (xhr.status === 200) {
//               // Successfully uploaded to S3, now save metadata
//               const songDto: SongDto = {
//                 ...songData,
//                 audioUrl: file.name // Use the filename as the S3 key
//               };
              
//               this.saveSongMetadata(songDto).subscribe({
//                 next: result => observer.next(result),
//                 error: error => observer.error(error),
//                 complete: () => observer.complete()
//               });
//             } else {
//               observer.error('Failed to upload file to S3');
//             }
//           };
          
//           xhr.onerror = () => {
//             observer.error('Error during file upload to S3');
//           };
          
//           xhr.send(file);
//         },
//         error: error => observer.error(error)
//       });
//     });
//   }

//   // Delete song completely (from both S3 and DB)
//   deleteCompleteSong(id: number, fileName: string): Observable<any> {
//     return new Observable(observer => {
//       // First delete from S3
//       this.deleteFileFromS3(fileName).subscribe({
//         next: () => {
//           // Then delete from DB
//           this.deleteSong(id).subscribe({
//             next: result => observer.next(result),
//             error: error => observer.error(error),
//             complete: () => observer.complete()
//           });
//         },
//         error: error => observer.error(error)
//       });
//     });
//   }
// }