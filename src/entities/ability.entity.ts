import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { Randomizable } from "../interfaces/randomizable";

@Entity()
export class Ability implements Randomizable {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
  })
  name: string;

  @Column({
    type: "longtext",
  })
  desc: string;

  @Column({
    type: "int",
  })
  chance: number;
}
