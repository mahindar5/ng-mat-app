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
	colorCombinations = {
		"red": {
			"colorDark": "#930100",
			"backgroundDark": "#201a19",
			"color": "#ffdad4",
			"background": "#fffbff"
		},
		"green": {
			"colorDark": "#015300",
			"backgroundDark": "#1a1c18",
			"color": "#77ff61",
			"background": "#fcfdf6"
		},
		"blue": {
			"colorDark": "#0000ef",
			"backgroundDark": "#1b1b1f",
			"color": "#e0e0ff",
			"background": "#fffbff"
		},
		"yellow": {
			"colorDark": "#494900",
			"backgroundDark": "#1c1c17",
			"color": "#eaea00",
			"background": "#fffbff"
		},
		"cyan": {
			"colorDark": "#004f4f",
			"backgroundDark": "#191c1c",
			"color": "#00fbfb",
			"background": "#fafdfc"
		},
		"magenta": {
			"colorDark": "#810081",
			"backgroundDark": "#1e1a1d",
			"color": "#ffd7f5",
			"background": "#fffbff"
		},
		"orange": {
			"colorDark": "#723600",
			"backgroundDark": "#201a17",
			"color": "#ffdcc7",
			"background": "#fffbff"
		},
		"chartreuse": {
			"colorDark": "#245100",
			"backgroundDark": "#1a1c18",
			"color": "#82ff10",
			"background": "#fdfdf5"
		},
		"spring-green": {
			"colorDark": "#005225",
			"backgroundDark": "#191c19",
			"color": "#63ff94",
			"background": "#fcfdf7"
		},
		"azure": {
			"colorDark": "#00458f",
			"backgroundDark": "#1a1b1f",
			"color": "#d7e3ff",
			"background": "#fdfbff"
		},
		"violet": {
			"colorDark": "#5f00c0",
			"backgroundDark": "#1d1b1e",
			"color": "#ecdcff",
			"background": "#fffbff"
		},
		"rose": {
			"colorDark": "#8f0045",
			"backgroundDark": "#201a1b",
			"color": "#ffd9e1",
			"background": "#fffbff"
		}
	};
	themes: DocsSiteTheme[] = this.generateColorCombinations(this.colorCombinations);

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

	generateColorCombinations(inputColors: any) {
		const output = [];
		const colorNames = Object.keys(inputColors);
		const angularOutput = [];

		for (let i = 0; i < colorNames.length; i++) {
			for (let j = 0; j < colorNames.length; j++) {
				const primary = colorNames[i];
				const accent = colorNames[j];

				const primaryData = inputColors[primary];
				const accentData = inputColors[accent];  // Use accent color data
				if (primary === accent) {
					continue;
				}

				const combination = {
					color: primaryData.color,         // Use primary color
					background: primaryData.background,  // Use primary background
					colorDark: primaryData.colorDark,     // Use primary colorDark
					backgroundDark: primaryData.backgroundDark, // Use primary backgroundDark
					displayName: `${this.capitalizeFirstLetter(primary)} & ${this.capitalizeFirstLetter(accent)}`,
					name: `${primary}-${accent}`,  // primary-accent format
					primary: primary,
					accent: accent,
				};
				output.push(combination);
				angularOutput.push({
					bundleName: `${primary}-${accent}-dark`,
					inject: false,
					input: `src/custom-themes/${primary}-${accent}-dark.scss`,
				});
				angularOutput.push({
					bundleName: `${primary}-${accent}`,
					inject: false,
					input: `src/custom-themes/${primary}-${accent}.scss`,
				});
			}
		}
		console.log(angularOutput.sort((a, b) => a.bundleName.localeCompare(b.bundleName)));
		return output.sort((a, b) => a.displayName.localeCompare(b.displayName));

	}
	capitalizeFirstLetter(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
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
