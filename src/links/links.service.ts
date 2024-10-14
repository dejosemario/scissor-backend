import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { LinksRepository } from './links.repository';
import { CreateLinkDto } from './dto/create-link.dto';
@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(LinksRepository)
    private readonly linksRepository: LinksRepository,
  ) {}

  async getAllLinks(): Promise<Array<Link>> {
    return this.linksRepository.find({});
  }

  async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
    const { name, url } = createLinkDto;
    return this.linksRepository.create({ name, url });
  }
}
