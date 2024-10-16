import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { LinksService } from 'src/links/links.service';

@Controller('')
export class WildcardController {
  constructor(private readonly linkService: LinksService) {}

  @Get('/:name')
  async getLinkedByName(
    @Param('name') name: string,
    @Res() res: Response,
  ): Promise<void> {
    console.log('getLinkedByName', name);
    const link = await this.linkService.getLink(name);
    console.log('Controller: Link found:', link);
    if (!link || !link.url) {
      // Handle case where link is not found
      throw new NotFoundException('Link not found');
    }
    return res.redirect(301, link.url);
  }
}
