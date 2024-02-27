import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/task.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UserService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userService.findOne(createTaskDto.userId);
    const task = this.taskRepository.create(createTaskDto);

    task.user = user;

    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    const taskUpdated = Object.assign(task, updateTaskDto);

    return this.taskRepository.save(taskUpdated);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    await this.taskRepository.delete(id);

    return task;
  }
}
