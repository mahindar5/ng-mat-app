import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StyleManager } from '../style-manager/style-manager';
import { DocsSiteTheme, ThemeStorage } from './theme-storage/theme-storage';

interface ColorScheme {
	colorDark: string;
	backgroundDark: string;
	color: string;
	background: string;
}

interface ColorCombinations {
	[key: string]: ColorScheme;
}

@Component({
	selector: 'theme-picker',
	templateUrl: 'theme-picker.html',
	styleUrls: ['theme-picker.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatTooltipModule,
		MatMenuModule,
		MatIconModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule
	]
})
export class ThemePicker implements OnInit, OnDestroy {
	currentTheme: DocsSiteTheme | undefined;
	isDarkMode = false;
	selectedPrimaryColor: string = '';
	selectedTertiaryColor: string = '';
	availableColors: string[] = [];

	// Keep colorCombinations public as it's referenced in the HTML template
	colorCombinations: ColorCombinations = {
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
	themes: DocsSiteTheme[];

	constructor(
		public styleManager: StyleManager,
		private _themeStorage: ThemeStorage
	) {
		this.availableColors = Object.keys(this.colorCombinations);
		this.themes = this.generateColorCombinations(this.colorCombinations);
		this.initializeTheme();
	}

	private initializeTheme(): void {
		const storedData = this._themeStorage.getStoredThemeData();

		if (storedData) {
			this.isDarkMode = storedData.isDark;
			const [primary, tertiary] = storedData.themeName.split('-');
			this.selectedPrimaryColor = primary;
			this.selectedTertiaryColor = tertiary;
			this.selectTheme(storedData.themeName);
		} else {
			// Set default colors
			this.selectedPrimaryColor = this.availableColors[0];
			this.selectedTertiaryColor = this.availableColors[1];
			this.selectTheme(`${this.selectedPrimaryColor}-${this.selectedTertiaryColor}`);
		}
	}

	// Must keep these methods as they are referenced in the HTML template
	onPrimaryColorChange() {
		if (this.selectedPrimaryColor && this.selectedTertiaryColor) {
			this.selectTheme(`${this.selectedPrimaryColor}-${this.selectedTertiaryColor}`);
		}
	}

	onTertiaryColorChange() {
		if (this.selectedPrimaryColor && this.selectedTertiaryColor) {
			this.selectTheme(`${this.selectedPrimaryColor}-${this.selectedTertiaryColor}`);
		}
	}

	generateColorCombinations(inputColors: ColorCombinations): DocsSiteTheme[] {
		const output: DocsSiteTheme[] = [];
		const colorNames = Object.keys(inputColors);

		for (let i = 0; i < colorNames.length; i++) {
			for (let j = 0; j < colorNames.length; j++) {
				const primary = colorNames[i];
				const accent = colorNames[j];

				const primaryData = inputColors[primary];

				if (primary === accent) {
					continue;
				}

				const combination: DocsSiteTheme = {
					color: primaryData.color,
					background: primaryData.background,
					colorDark: primaryData.colorDark,
					backgroundDark: primaryData.backgroundDark,
					displayName: `${this.capitalizeFirstLetter(primary)} & ${this.capitalizeFirstLetter(accent)}`,
					name: `${primary}-${accent}`,
					primary: primary,
					accent: accent,
				};
				output.push(combination);
			}
		}

		// Fix the TypeScript error by using non-null assertions or providing fallback values
		return output.sort((a, b) => (a.displayName || '').localeCompare(b.displayName || ''));
	}

	// Must keep this method as it's referenced in the HTML template
	capitalizeFirstLetter(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	ngOnInit() {
		// Empty implementation to satisfy interface
	}

	ngOnDestroy() {
		// Empty implementation to satisfy interface
	}

	// Must keep this method as it's referenced in the HTML template
	toggleDarkMode() {
		this.updateTheme();
		if (this.currentTheme) {
			this._themeStorage.storeThemeData(this.currentTheme, this.isDarkMode);
		}
	}

	selectTheme(themeName: string) {
		const theme = this.themes.find(currentTheme => currentTheme.name === themeName) ||
			this.themes.find(currentTheme => currentTheme.isDefault)!;

		this.currentTheme = theme;
		this.updateTheme();

		if (this.currentTheme) {
			this._themeStorage.storeThemeData(this.currentTheme, this.isDarkMode);
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
