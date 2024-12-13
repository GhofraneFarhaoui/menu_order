import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './entities/settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>
  ) {}

  async getSettings(): Promise<Settings | null> {
    return await this.settingsRepository.findOne({ where: { id: 1 } });
  }

  async updateSettings(settings: Partial<Settings>): Promise<Settings> {
    const existingSettings = await this.getSettings();
    if (existingSettings) {
      const updatedSettings = { ...existingSettings, ...settings };
      return this.settingsRepository.save(updatedSettings);
    } else {
      return this.settingsRepository.save(settings);
    }
  }
}
