import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Team } from '../models/team';
import { Coach } from '../models/coach';
import { Player } from '../models/player';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})

export class TeamServiceService {

  private apiUrl = 'http://localhost:3000/team/api';


  constructor(private http: HttpClient) { }


  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/get`)
      .pipe(
        catchError(this.handleError<Team[]>('getTeams', []))
      );
  }



  getTeamById(teamId: string): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/get/${teamId}`)
      .pipe(
        catchError(this.handleError<Team>('getTeamById'))
      );
  }



  addTeam(teamData: Team): Observable<Team> {
    return this.http.post<Team>(`${this.apiUrl}/post`, teamData).pipe(
      catchError(this.handleError<Team>('addTeam'))
    );
  }

  updateTeam(id: string, teamData: Team): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/put/${id}`, teamData).pipe(
      catchError(this.handleError<Team>('updateTeam'))
    );
  }


  deleteTeam(teamId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${teamId}`)
      .pipe(
        catchError(this.handleError<any>('deleteTeam'))
      );
  }






  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} a échoué: ${error.message}`);
      return of(result as T);
    };
  }
}