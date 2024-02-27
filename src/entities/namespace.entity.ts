import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

import { Task } from "./task.entity"

@Entity()
export class Namespace {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ nullable: true })
	description: string

	@OneToMany(() => Task, task => task.namespace )
	tasks: Task[]
}