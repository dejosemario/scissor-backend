import { Body, Controller, Get, Post } from '@nestjs/common';
import { LinksService } from './links.service';
import { Link } from './link.entity';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  async getAllLinks(): Promise<Array<Link>> {
    console.log('getAllLinks', this.linksService.getAllLinks());
    return this.linksService.getAllLinks();
  }

  @Post()
  async createLink(
    @Body('name') name: string,
    @Body('url') url: string,
  ): Promise<Link> {
    console.log('name', name, 'url', url);
    return this.linksService.createLink(name, url);
  }
}
