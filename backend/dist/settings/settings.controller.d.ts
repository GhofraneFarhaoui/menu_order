import { SettingsService } from './settings.service';
import { Settings } from './entities/settings.entity';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(): Promise<Settings | null>;
    updateSettings(settings: Partial<Settings>): Promise<Settings>;
}
