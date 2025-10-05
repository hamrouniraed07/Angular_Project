import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../models/team';
import { TeamServiceService } from '../services/team-service.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  teamId!: string;
  team: Team | undefined; // Cette variable contiendra les détails de l'équipe
  isLoading: boolean = true;  // Pour indiquer que les données sont en cours de chargement
  errorMessage: string = '';



  constructor(
    private route: ActivatedRoute, // Pour récupérer l'ID de l'URL
    private router: Router,
    private teamService: TeamServiceService, // Le service pour interagir avec le backend
    private location: Location // Pour gérer la navigation
  ) { }

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('id');  // Récupère l'ID depuis la route
    if (teamId) {
      this.teamService.getTeamById(teamId).subscribe(
        (team) => {
          this.team = team;
        },
        (error) => {
          console.error('Erreur de récupération des détails de l\'équipe', error);
        }
      );
    } else {
      console.error('ID de l\'équipe manquant');
    }
  }

  // Méthode pour obtenir les détails d'une équipe
  getTeamDetails(teamId: string): void {
    this.teamService.getTeamById(teamId).subscribe({
      next: (data: Team) => {
        this.team = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des détails de l\'équipe';
        this.isLoading = false;
      }
    });
  }


  // Méthode pour supprimer une équipe
  deleteTeam(): void {
    const teamId = this.route.snapshot.paramMap.get('id');
    console.log('teamId pour suppression:', teamId);
    if (teamId && confirm('Voulez-vous vraiment supprimer cette équipe ?')) {
      this.teamService.deleteTeam(teamId).subscribe({
        next: () => {
          alert('L\'équipe a été supprimée');
          this.location.back();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression de l\'équipe';
          console.error('Erreur:', err);
        },
      });
    } else {
      console.error('ID de l\'équipe manquant pour la suppression');
    }
  }

  goToUpdateTeam(): void {
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.router.navigate(['/update', teamId]);
    } else {
      console.error('ID de l\'équipe manquant pour redirection vers la mise à jour');
    }
  }



  goBack(): void {
    this.location.back();
  }
}




