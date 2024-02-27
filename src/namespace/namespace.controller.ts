import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NamespaceService } from './namespace.service';
import { CreateNamespaceDto } from './dto/create-namespace.dto';
import { UpdateNamespaceDto } from './dto/update-namespace.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('namespace')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('namespace')
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Post()
  create(@Body() createNamespaceDto: CreateNamespaceDto) {
    return this.namespaceService.create(createNamespaceDto);
  }

  @Get()
  findAll() {
    return this.namespaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.namespaceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNamespaceDto: UpdateNamespaceDto,
  ) {
    return this.namespaceService.update(+id, updateNamespaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.namespaceService.remove(+id);
  }
}
