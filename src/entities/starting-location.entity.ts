import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Randomizable } from "../interfaces/randomizable";
import { Identifiable } from "../interfaces/identifiable";
import { ChaosSeed } from "./chaos-seed.entity";

@Entity()
export class StartingLocation implements Identifiable, Randomizable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  generalLocation: string;

  @Column()
  specificLocation: string;

  @Column()
  isDeadly: boolean;

  @Column()
  chance: number;

  @OneToMany(() => ChaosSeed, (chaosSeed) => chaosSeed.startingLocation)
  chaosSeeds: ChaosSeed[];
}
