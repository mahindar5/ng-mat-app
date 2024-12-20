import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
	imports: [MatButtonModule, MatTooltipModule, MatMenuModule, MatIconModule]
})
export class ThemePicker implements OnInit, OnDestroy {
	currentTheme: DocsSiteTheme | undefined;

	// The below colors need to align with the themes defined in theme-picker.scss
	themes: DocsSiteTheme[] = [
		{
			color: '#ffd9e1',
			displayName: 'Rose & Red',
			name: 'rose-red',
			background: '#fffbff',
		},
		{
			color: '#d7e3ff',
			displayName: 'Azure & Blue',
			name: 'azure-blue',
			background: '#fdfbff',
			isDefault: true,
		},
		{
			color: '#810081',
			displayName: 'Magenta & Violet',
			name: 'magenta-violet',
			background: '#1e1a1d',
		},
		{
			color: '#004f4f',
			displayName: 'Cyan & Orange',
			name: 'cyan-orange',
			background: '#191c1c',
		},
	];

	constructor(public styleManager: StyleManager,
		private _themeStorage: ThemeStorage) {
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
	}

	ngOnDestroy() {
	}

	selectTheme(themeName: string) {
		const theme = this.themes.find(currentTheme => currentTheme.name === themeName) ||
			this.themes.find(currentTheme => currentTheme.isDefault)!;

		this.currentTheme = theme;

		if (theme.isDefault) {
			this.styleManager.removeStyle('theme');
		} else {
			this.styleManager.setStyle('theme', `${theme.name}.css`);
		}

		if (this.currentTheme) {
			this._themeStorage.storeTheme(this.currentTheme);
		}
	}
}
