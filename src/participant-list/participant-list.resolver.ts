import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { ParticipantListService } from './participant-list.service';
import { ParticipantList } from './entities/participant-list.entity';
import { CreateParticipantListInput } from './dto/create-participant-list.input';
import {Relations} from "../rest/util/responses";
import {Prisma} from "@prisma/client";


@Resolver(() => ParticipantList)
export class ParticipantListResolver {
  constructor(private readonly participantListService: ParticipantListService) {}

  @Mutation(() => ParticipantList, {name:'register', description: "регистрация человека на мероприятие"})
  createParticipantList(@Args('createParticipantListInput') createParticipantListInput: CreateParticipantListInput, @Relations() relations: { select: Prisma.ParticipantListSelect }) {
    return this.participantListService.create(createParticipantListInput, relations);
  }

  @Query(() => String, { name: 'status', description: "получение статуса участника на данном мероприятии"})
  getCurrentStatus(@Args('input') input: CreateParticipantListInput) {
    return this.participantListService.getCurrentStatus(input.personID, input.eventID);
  }

  @Mutation(() => ParticipantList, {name:'approve', description: "подтверждение участия участника в мероприятии"})
  approve(@Args('input') input: CreateParticipantListInput) {
    return this.participantListService.approve(input.personID, input.eventID);
  }

}
