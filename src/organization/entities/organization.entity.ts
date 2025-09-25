import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Organization {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  pilots: number;

  @Field(() => Int)
  flightHours: number;

  @Field(() => Int)
  airships: number;

  @Field()
  prompt: string;

  @Field()
  securityObs: string;

  @Field()
  generalObs: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
