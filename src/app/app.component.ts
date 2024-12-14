import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemePicker } from "./theme-picker/theme-picker";
import { ThemeStorage } from './theme-picker/theme-storage/theme-storage';

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
		MatIcon, MatNavList, MatExpansionModule, MatListItem
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	currentTheme: string = 'magenda-violet';
	menu: NavItem[] = [
		{
			displayName: 'TMS Metrics',
			iconName: 'add',
			route: 'tms-metrics',
		},
	];
	public readonly themeStorage = inject(ThemeStorage);
	constructor() {
		this.themeStorage.onThemeUpdate.subscribe((theme: any) => {
			this.currentTheme = theme.name;
		});
	}
}
