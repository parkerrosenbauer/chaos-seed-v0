import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { Identifiable } from "../interfaces/identifiable";
import { Randomizable } from "../interfaces/randomizable";

@Entity()
export class Ability implements Identifiable, Randomizable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ability: string;

  @Column("text")
  info: string;

  @Column()
  chance: number;
}
