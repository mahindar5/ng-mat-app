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

interface StoredThemeData {
	themeName: string;
	isDark: boolean;
}

@Injectable({ providedIn: 'root' })
export class ThemeStorage {
	static storageKey = 'docs-theme-storage-data';

	storeThemeData(theme: DocsSiteTheme, isDark: boolean) {
		try {
			const data: StoredThemeData = {
				themeName: theme.name,
				isDark: isDark
			};
			window.localStorage[ThemeStorage.storageKey] = JSON.stringify(data);
		} catch { }
	}

	getStoredThemeData(): StoredThemeData | null {
		try {
			const stored = window.localStorage[ThemeStorage.storageKey];
			if (stored) {
				return JSON.parse(stored);
			}
		} catch { }
		return null;
	}

	clearStorage() {
		try {
			window.localStorage.removeItem(ThemeStorage.storageKey);
		} catch { }
	}
}
