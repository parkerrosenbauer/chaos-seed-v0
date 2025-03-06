import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Randomizable } from "../interfaces/randomizable";
import { ChaosSeed } from "./chaos-seed.entity";

@Entity()
export class Race implements Randomizable {
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
    type: "text",
  })
  startingLanguage: string;

  @Column({
    type: "int",
  })
  chance: number;

  @OneToMany(() => ChaosSeed, (chaosSeed) => chaosSeed.race)
  chaosSeeds: ChaosSeed[];
}
