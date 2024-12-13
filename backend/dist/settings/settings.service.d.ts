import { Repository } from 'typeorm';
import { Settings } from './entities/settings.entity';
export declare class SettingsService {
    private readonly settingsRepository;
    constructor(settingsRepository: Repository<Settings>);
    getSettings(): Promise<Settings | null>;
    updateSettings(settings: Partial<Settings>): Promise<Settings>;
}
