import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm"

import { Task } from "./task.entity"
import { Role } from "./role.entity"

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "varchar", length: 20 })
	name: string

	@Column({ type: "varchar", length: 20 })
	surname: string

	@Column({ type: "varchar", length: 40 })
	email: string

	@Column()
	password: string

	@Column({ default: true })
	status: boolean

	@Column({ default: () => "CURRENT_TIMESTAMP" })
	crated_at: Date

	@OneToOne(() => Role)
	role: Role

	@OneToMany(() => Task, task => task.user )
	tasks: Task[]
}