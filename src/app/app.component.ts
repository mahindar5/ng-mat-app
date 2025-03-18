import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet, Routes } from '@angular/router';
import { ThemePicker } from "./theme-picker/theme-picker";

export interface NavItem {
	displayName: string;
	disabled?: boolean;
	iconName: string;
	route?: string;
	children?: NavItem[];
}

// Map to associate routes with icon names
const ROUTE_ICON_MAP: { [key: string]: string } = {
	'ai-dashboard': 'dashboard',
	// Add more route-to-icon mappings as needed
};

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink, ThemePicker, MatToolbarModule, MatSidenavModule,
		MatIcon, MatNavList, MatExpansionModule, MatListItem, MatButtonModule
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	menu: NavItem[] = [];

	constructor(private router: Router) { }

	ngOnInit() {
		this.generateMenuFromRoutes();
	}

	generateMenuFromRoutes() {
		// Get the current router configuration
		const routes: Routes = this.router.config;

		// Create menu items from root-level routes, excluding redirect routes and empty paths
		this.menu = routes
			.filter(route => {
				// Filter out redirect routes and empty paths
				return route.path !== '' &&
					!route.redirectTo &&
					typeof route.path === 'string';
			})
			.map(route => {
				// Convert route path to display name (capitalize first letter of each word)
				const displayName = route.path!
					.split('-')
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ');

				// Use the icon mapping or provide a default icon
				const iconName = ROUTE_ICON_MAP[route.path!] || 'chevron_right';

				return {
					displayName,
					iconName,
					route: `/${route.path}`
				};
			});
	}
}
