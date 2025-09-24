import { BaseEntity } from './base.entity';
import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { UserRepository } from '../repository/user.repository';

@Entity({
	tableName: 'elt_users',
	repository: () => UserRepository,
})
export class UserEntity extends BaseEntity {
	[EntityRepositoryType]?: UserRepository;

	@Property()
	email: string;

	@Property({ fieldName: 'password' })
	password: string;

	@Property({ fieldName: 'firstName' })
	firstName?: string;

	@Property({ fieldName: 'lastName' })
	lastName?: string;
}
