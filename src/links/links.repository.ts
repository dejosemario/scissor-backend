import { Repository } from 'typeorm';
import { Link } from './link.entity';
import { CreateLinkDto } from './dto/create-link.dto';

export class LinksRepository extends Repository<Link> {
  async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
    const { name, url } = createLinkDto;
    const link = this.create({ name, url });

    await this.save(link);

    return link;
  }
}
