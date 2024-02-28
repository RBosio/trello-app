import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

import { User } from "./user.entity"
import { Namespace } from "./namespace.entity"

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column({ nullable: true })
	description: string

	@ManyToOne(() => User, user => user.tasks )
	user: User

	@ManyToOne(() => Namespace, namespace => namespace.tasks )
	namespace: Namespace
}