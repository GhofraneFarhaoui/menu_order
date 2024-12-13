import { Controller, Get, Put, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from './entities/settings.entity';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(): Promise<Settings | null> {
    return this.settingsService.getSettings();
  }

  @Put()
  async updateSettings(@Body() settings: Partial<Settings>): Promise<Settings> {
    return this.settingsService.updateSettings(settings);
  }
}
