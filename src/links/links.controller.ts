import { Controller, Get } from '@nestjs/common';
import { LinksService } from './links.service';
import { Link } from './link.entity';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  async getAllLinks(): Promise<Array<Link>> {
    return this.linksService.getAllLinks();
  }

  
}
