import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemePicker } from "./theme-picker/theme-picker";

export interface NavItem {
	displayName: string;
	disabled?: boolean;
	iconName: string;
	route?: string;
	children?: NavItem[];
}
@Component({
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink, ThemePicker, MatToolbarModule, MatSidenavModule,
		MatIcon, MatNavList, MatExpansionModule, MatListItem, MatButtonModule
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	menu: NavItem[] = [
		{
			displayName: 'AI Agent',
			iconName: 'account_circle',
			route: '/ai-dashboard/ai-agent'
		},
		{
			displayName: 'AI Chat',
			iconName: 'chat',
			route: '/ai-dashboard/ai-chat'
		},
		{
			displayName: 'Settings',
			iconName: 'settings',
			route: '/ai-dashboard/settings'
		}
	];
	// public readonly themeStorage = inject(ThemeStorage);
	constructor() {
		// this.themeStorage.onThemeUpdate.subscribe((theme: any) => {
		// 	this.currentTheme = theme.name;
		// });
	}
}
