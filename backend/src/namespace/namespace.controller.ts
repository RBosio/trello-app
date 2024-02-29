import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { NamespaceService } from './namespace.service';
import { CreateNamespaceDto } from './dto/create-namespace.dto';
import { UpdateNamespaceDto } from './dto/update-namespace.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Namespace } from 'src/entities/namespace.entity';

@ApiTags('namespace')
@ApiBearerAuth()
@Controller('namespace')
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Post()
  create(@Body() createNamespaceDto: CreateNamespaceDto) {
    return this.namespaceService.create(createNamespaceDto);
  }

  @Put('order')
  order(@Body() arr: any) {
    this.namespaceService.order(arr);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.namespaceService.findAll(+userId);
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
