import { Body, Controller, Get, Post } from '@nestjs/common';
import { LinksService } from './links.service';
import { Link } from './link.entity';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  async getAllLinks(): Promise<Array<Link>> {
    console.log('getAllLinks', this.linksService.getAllLinks());
    return this.linksService.getAllLinks();
  }

  @Post()
  async createLink(@Body() createLinkDto: CreateLinkDto): Promise<Link> {
    return this.linksService.createLink(createLinkDto);
  }
}
