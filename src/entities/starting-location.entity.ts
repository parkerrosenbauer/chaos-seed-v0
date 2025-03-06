import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Randomizable } from "../interfaces/randomizable";
import { ChaosSeed } from "./chaos-seed.entity";

@Entity()
export class StartingLocation implements Randomizable {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
  })
  generalLocation: string;

  @Column({
    type: "text",
  })
  specificLocation: string;

  @Column({
    type: "bool",
  })
  isDeadly: boolean;

  @Column({
    type: "int",
  })
  chance: number;

  @OneToMany(() => ChaosSeed, (chaosSeed) => chaosSeed.startingLocation)
  chaosSeeds: ChaosSeed[];
}
