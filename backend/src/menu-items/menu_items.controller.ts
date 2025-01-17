import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MenuItemsService } from './menu_items.service';
import { CreateMenuItemDto } from './create-menu-item.dto';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';

@Controller('menu_items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  // Get all menu items
  @Get()
  async findAll() {
    return this.menuItemsService.findAll();
  }

  // Get menu items by category
  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: number) {
    return this.menuItemsService.findByCategory(categoryId);
  }

  // Create a new menu item
  @Post()
  async create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }

  // Upload an image and return its URL
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static/images',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    })
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ imageUrl: string }> {
    const imageUrl = `http://localhost:3000/static/images/${file.filename}`;

    return { imageUrl };
  }

  // Publish all menu items
  @Patch('publish')
  async publishAll() {
    await this.menuItemsService.publishAll();
    return { message: 'Menu published successfully' };
  }
}
