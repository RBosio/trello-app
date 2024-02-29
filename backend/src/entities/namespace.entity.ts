import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"

import { Task } from "./task.entity"
import { User } from "./user.entity"

@Entity()
export class Namespace {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ nullable: true })
	description: string

	@Column({ default: true })
	status: boolean

	@OneToMany(() => Task, task => task.namespace )
	tasks: Task[]

	@ManyToOne(() => User, user => user.namespaces )
	user: User
}