import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm"

import { Namespace } from "./namespace.entity"
import { Role } from "./role.entity"

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "varchar", length: 20 })
	name: string

	@Column({ type: "varchar", length: 20 })
	surname: string

	@Column({ unique: true, type: "varchar", length: 40 })
	email: string

	@Column()
	password: string

	@Column({ default: true })
	status: boolean

	@Column({ default: () => "CURRENT_TIMESTAMP" })
	crated_at: Date

	@OneToOne(() => Role)
	role: Role

	@OneToMany(() => Namespace, namespace => namespace.user )
	namespaces: Namespace[]
}