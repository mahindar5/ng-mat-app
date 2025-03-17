import { Injectable } from '@angular/core';

export interface DocsSiteTheme {
	name: string;
	displayName?: string;
	color: string;
	background: string;
	colorDark?: string;
	backgroundDark?: string;
	isDefault?: boolean;
	primary?: string;
	accent?: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeStorage {
	static storageKey = 'docs-theme-storage-current-name';
	static darkModeKey = 'docs-theme-storage-dark-mode';

	// onThemeUpdate: EventEmitter<DocsSiteTheme> = new EventEmitter<DocsSiteTheme>();
	// onDarkModeUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();

	storeTheme(theme: DocsSiteTheme) {
		try {
			window.localStorage[ThemeStorage.storageKey] = theme.name;
		} catch { }

		// this.onThemeUpdate.emit(theme);
	}

	getStoredThemeName(): string | null {
		try {
			return window.localStorage[ThemeStorage.storageKey] || null;
		} catch {
			return null;
		}
	}

	storeDarkMode(isDark: boolean) {
		try {
			window.localStorage[ThemeStorage.darkModeKey] = JSON.stringify(isDark);
		} catch { }

		// this.onDarkModeUpdate.emit(isDark);
	}

	getStoredDarkMode(): boolean {
		try {
			const stored = window.localStorage[ThemeStorage.darkModeKey];
			return stored ? JSON.parse(stored) : false;
		} catch {
			return false;
		}
	}

	clearStorage() {
		try {
			window.localStorage.removeItem(ThemeStorage.storageKey);
			window.localStorage.removeItem(ThemeStorage.darkModeKey);
		} catch { }
	}
}
