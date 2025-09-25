import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrganizationInput {
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
}
