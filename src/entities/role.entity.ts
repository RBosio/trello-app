import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"

import { User } from "./user.entity"

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@OneToOne(() => User)
	@JoinColumn()
	user: User
}