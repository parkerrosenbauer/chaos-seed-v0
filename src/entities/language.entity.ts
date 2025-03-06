import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Ability {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
  })
  name: string;
}
