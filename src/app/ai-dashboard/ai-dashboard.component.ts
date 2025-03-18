import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-ai-dashboard',
	imports: [RouterLink, RouterOutlet, MatTabsModule,],
	templateUrl: './ai-dashboard.component.html',
	styleUrl: './ai-dashboard.component.scss'
})
export class AiDashboardComponent implements OnInit {
	activeLink: any;
	selectedTabIndex = 0;

	links = [
		{ label: 'AI Agent', route: '/ai-dashboard/ai-agent' },
		{ label: 'AI Chat', route: '/ai-dashboard/ai-chat' },
		{ label: 'Settings', route: '/ai-dashboard/settings' }
	];

	constructor(private router: Router) {
		// Set the default active tab
		this.activeLink = this.links[0];
	}

	ngOnInit(): void {
		// Initialize the selected tab index based on the current route
		const currentRoute = this.router.url;
		const linkIndex = this.links.findIndex(link => currentRoute.includes(link.route));
		if (linkIndex !== -1) {
			this.selectedTabIndex = linkIndex;
			this.activeLink = this.links[linkIndex];
		}
	}

	onTabChanged(index: number): void {
		this.selectedTabIndex = index;
		this.activeLink = this.links[index];
		// Navigate to the selected tab's route
		this.router.navigateByUrl(this.links[index].route);
	}
}
