import { Component } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-ai-dashboard',
	imports: [RouterLink, RouterOutlet, MatTabsModule,],
	templateUrl: './ai-dashboard.component.html',
	styleUrl: './ai-dashboard.component.scss'
})
export class AiDashboardComponent {
	activeLink: any;

	links = [
		{ label: 'AI Agent', route: '/ai-dashboard/ai-agent' },
		{ label: 'AI Chat', route: '/ai-dashboard/ai-chat' },
		{ label: 'Settings', route: '/ai-dashboard/settings' }
	];

	constructor() {
		// Set the default active tab
		this.activeLink = this.links[0];
	}
}
