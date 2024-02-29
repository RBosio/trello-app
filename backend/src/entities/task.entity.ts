import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

import { Namespace } from "./namespace.entity"

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column({ nullable: true })
	description: string

	@ManyToOne(() => Namespace, namespace => namespace.tasks )
	namespace: Namespace
}