import { UserEntity } from '../entity/user.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends EntityRepository<UserEntity> {
	async getAllUsers(): Promise<UserEntity[]> {
		// By default, mikro-orm uses Knex query syntax but you can use raw queries like this if it's easier:
		// const rawResult = await this.em.getKnex().raw<CalendarEventEntity[][]>('select * from elt_event where start <= ? AND end >= ?', [end, start])
		// return rawResult[0];
		return this.findAll();
	}

  async registerUser(
    email: string,
    encryptedPassword: string,
    firstName: string,
    lastName: string,
	): Promise<UserEntity> {
		// const currentUser = this.find({ email });
    // if (currentUser) throw new BadRequestException('Unable to create user');
		const newEntity = this.create({
			email,
			password: encryptedPassword,
			firstName,
			lastName,
		});
		await this.insert(newEntity);
		return newEntity;
	}

	async findUser(
		email: string
	): Promise<UserEntity> {
		const user = await this.findOne({ email });
		return user;
	}

	async findUserById(
		id: number
	): Promise<UserEntity> {
		const user = await this.findOne({ id });
		return user;
	}

	// async findForRange(start: Date, end: Date): Promise<CalendarEventEntity[]> {
	// 	// By default, mikro-orm uses Knex query syntax but you can use raw queries like this if it's easier:
	// 	// const rawResult = await this.em.getKnex().raw<CalendarEventEntity[][]>('select * from elt_event where start <= ? AND end >= ?', [end, start])
	// 	// return rawResult[0];
	// 	return this.find({ start: { $lte: end }, end: { $gte: start } });
	// }

	// async createNewEvent(
	// 	name: string,
	// 	start: Date,
	// 	end: Date,
	// ): Promise<CalendarEventEntity> {
	// 	const newEntity = this.create({ name, start, end });
	// 	await this.insert(newEntity);

	// 	return newEntity;
	// }

	// async updateEvent(
	// 	id: number,
	// 	name: string,
	// 	start: Date,
	// 	end: Date,
	// ): Promise<CalendarEventEntity> {
	// 	const entity = await this.findOne({ id });
	// 	if (!entity) {
	// 		throw new Error(`Calendar event with id ${id} not found`);
	// 	}

	// 	this.assign(entity, { name, start, end });
	// 	await this.em.flush();

	// 	return entity;
	// }

	// async deleteById(id: number): Promise<void> {
	// 	await this.nativeDelete({ id });
	// }
}
