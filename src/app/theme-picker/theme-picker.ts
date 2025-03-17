import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StyleManager } from '../style-manager/style-manager';
import { DocsSiteTheme, ThemeStorage } from './theme-storage/theme-storage';

@Component({
	selector: 'theme-picker',
	templateUrl: 'theme-picker.html',
	styleUrls: ['theme-picker.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [
		MatButtonModule,
		MatTooltipModule,
		MatMenuModule,
		MatIconModule,
		MatSlideToggleModule,
		FormsModule
	]
})
export class ThemePicker implements OnInit, OnDestroy {
	currentTheme: DocsSiteTheme | undefined;
	isDarkMode = false;
	//color:--mat-sys-primary-container
	//background:--mat-sys-on-surface
	themes: DocsSiteTheme[] = [
		{
			color: '#ffd9e1',
			background: '#fffbff',
			colorDark: '#8f0045',
			backgroundDark: '#201a1b',
			displayName: 'Rose & Red',
			name: 'rose-red',
		},
		{
			color: '#d7e3ff',
			background: '#fdfbff',
			colorDark: '#00458f',
			backgroundDark: '#1a1b1f',
			displayName: 'Azure & Blue',
			name: 'azure-blue',
		},
		{
			color: '#ffd7f5',
			background: '#fff9ff',
			displayName: 'Magenta & Violet',
			name: 'magenta-violet',
			colorDark: '#810081',
			backgroundDark: '#1e1a1d',
		},
		{
			color: '#00fbfb',
			background: '#f9ffff',
			displayName: 'Cyan & Orange',
			name: 'cyan-orange',
			colorDark: '#004f4f',
			backgroundDark: '#191c1c',
		},
	];

	constructor(
		public styleManager: StyleManager,
		private _themeStorage: ThemeStorage
	) {
		this.isDarkMode = this._themeStorage.getStoredDarkMode();
		const themeName = this._themeStorage.getStoredThemeName();
		if (themeName) {
			this.selectTheme(themeName);
		} else {
			this.themes.find(themes => {
				if (themes.isDefault === true) {
					this.selectTheme(themes.name);
				}
			});
		}
	}

	ngOnInit() {
		// this._themeStorage.onDarkModeUpdate.subscribe((isDark: boolean) => {
		// 	this.isDarkMode = isDark;
		// 	this.updateTheme();
		// });
	}

	ngOnDestroy() {
	}

	toggleDarkMode() {
		// this.isDarkMode = !this.isDarkMode;
		this._themeStorage.storeDarkMode(this.isDarkMode);
		this.updateTheme();
	}

	selectTheme(themeName: string) {
		const theme = this.themes.find(currentTheme => currentTheme.name === themeName) ||
			this.themes.find(currentTheme => currentTheme.isDefault)!;

		this.currentTheme = theme;
		this.updateTheme();

		if (this.currentTheme) {
			this._themeStorage.storeTheme(this.currentTheme);
		}
	}

	private updateTheme() {
		if (!this.currentTheme) return;

		const themeName = this.isDarkMode
			? `${this.currentTheme.name}-dark`
			: this.currentTheme.name;

		this.styleManager.setStyle('theme', `${themeName}.css`);
	}
}
