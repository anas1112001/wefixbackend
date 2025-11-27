import { ApolloError } from 'apollo-server-express';
import { Op, WhereOptions } from 'sequelize';
import { User } from '../../../../db/models/user.model';
import { Lookup, LookupCategory } from '../../../../db/models/lookup.model';
import { IndividualStatus } from '../typedefs/Individual/enums/Individual.enums';
import { IndividualFilterInput } from '../typedefs/Individual/inputs/IndividualFilterInput.schema';
import { CreateIndividualInput } from '../typedefs/Individual/inputs/CreateIndividualInput.schema';
import { UpdateIndividualInput } from '../typedefs/Individual/inputs/UpdateIndividualInput.schema';
import { IndividualOrm } from './orm/IndividualOrm';
import * as bcrypt from 'bcrypt';

class IndividualRepository {
  public createIndividual: (individualData: CreateIndividualInput) => Promise<IndividualOrm>;
  public deleteIndividualById: (id: string) => Promise<boolean>;
  public getIndividualById: (id: string) => Promise<IndividualOrm | null>;
  public getIndividuals: (filter: IndividualFilterInput) => Promise<{ individuals: IndividualOrm[]; total: number; page: number; limit: number; totalPages: number }>;
  public updateIndividualById: (id: string, updateData: UpdateIndividualInput) => Promise<IndividualOrm | null>;

  private individualRoleLookupId: string | null = null;

  constructor() {
    this.createIndividual = this._createIndividual.bind(this);
    this.deleteIndividualById = this._deleteIndividualById.bind(this);
    this.getIndividualById = this._getIndividualById.bind(this);
    this.getIndividuals = this._getIndividuals.bind(this);
    this.updateIndividualById = this._updateIndividualById.bind(this);
  }

  // Helper method to get Individual role lookup ID (cached)
  private async _getIndividualRoleLookupId(): Promise<string | null> {
    if (this.individualRoleLookupId) {
      return this.individualRoleLookupId;
    }

    const individualRole = await Lookup.findOne({
      where: {
        category: LookupCategory.USER_ROLE,
        name: 'Individual',
      },
    });
    
    this.individualRoleLookupId = individualRole?.id || null;
    return this.individualRoleLookupId;
  }

  // Helper method to map User to IndividualOrm
  private _mapUserToIndividual(user: User): IndividualOrm {
    return {
      id: user.id,
      individualId: user.userNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.mobileNumber,
      isActive: user.isActive ? IndividualStatus.ACTIVE : IndividualStatus.INACTIVE,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as IndividualOrm;
  }

  private async _createIndividual(individualData: CreateIndividualInput): Promise<IndividualOrm> {
    try {
      const individualRoleId = await this._getIndividualRoleLookupId();
      if (!individualRoleId) {
        throw new ApolloError('Individual role lookup not found', 'INDIVIDUAL_ROLE_NOT_FOUND');
      }

      // Generate a default password for individuals (they can reset it later)
      const salt = await bcrypt.genSalt(10);
      const defaultPassword = await bcrypt.hash('Individual123!', salt);

      const newUser = await User.create({
        email: individualData.email,
        firstName: individualData.firstName,
        lastName: individualData.lastName,
        userNumber: individualData.individualId,
        mobileNumber: individualData.phoneNumber || null,
        isActive: individualData.isActive === IndividualStatus.ACTIVE || individualData.isActive === undefined,
        userRoleId: individualRoleId,
        password: defaultPassword,
        deviceId: 'individual-device', // Default device ID, should be updated on first login
        fcmToken: 'individual-fcm-token', // Default FCM token, should be updated on first login
      });

      return this._mapUserToIndividual(newUser);
    } catch (error) {
      throw new ApolloError(`Failed to create individual: ${error.message}`, 'INDIVIDUAL_CREATION_FAILED');
    }
  }

  private async _getIndividualById(id: string): Promise<IndividualOrm | null> {
    try {
      const individualRoleId = await this._getIndividualRoleLookupId();
      if (!individualRoleId) {
        return null;
      }

      const user = await User.findOne({
        where: {
          id,
          userRoleId: individualRoleId,
        },
        include: [{ model: Lookup, as: 'userRoleLookup', required: false }],
      });

      if (!user) {
        return null;
      }

      return this._mapUserToIndividual(user);
    } catch (error) {
      throw new ApolloError(`Failed to get individual: ${error.message}`, 'INDIVIDUAL_RETRIEVAL_FAILED');
    }
  }

  private async _getIndividuals(filter: IndividualFilterInput): Promise<{ individuals: IndividualOrm[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const individualRoleId = await this._getIndividualRoleLookupId();
      if (!individualRoleId) {
        return {
          individuals: [],
          limit: filter.limit || 10,
          page: filter.page || 1,
          total: 0,
          totalPages: 0,
        };
      }

      const page = filter.page || 1;
      const limit = filter.limit || 10;
      const offset = (page - 1) * limit;

      const where: WhereOptions = {
        userRoleId: individualRoleId,
      };

      if (filter.status) {
        where.isActive = filter.status === IndividualStatus.ACTIVE;
      }

      if (filter.search) {
        where[Op.or as any] = [
          { firstName: { [Op.iLike]: `%${filter.search}%` } },
          { lastName: { [Op.iLike]: `%${filter.search}%` } },
          { email: { [Op.iLike]: `%${filter.search}%` } },
          { userNumber: { [Op.iLike]: `%${filter.search}%` } },
        ];
      }

      const { count, rows } = await User.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        where,
        include: [{ model: Lookup, as: 'userRoleLookup', required: false }],
      });

      const totalPages = Math.ceil(count / limit);

      return {
        individuals: rows.map(user => this._mapUserToIndividual(user)),
        limit,
        page,
        total: count,
        totalPages,
      };
    } catch (error) {
      throw new ApolloError(`Failed to get individuals: ${error.message}`, 'INDIVIDUALS_RETRIEVAL_FAILED');
    }
  }

  private async _updateIndividualById(id: string, updateData: UpdateIndividualInput): Promise<IndividualOrm | null> {
    try {
      const individualRoleId = await this._getIndividualRoleLookupId();
      if (!individualRoleId) {
        return null;
      }

      const user = await User.findOne({
        where: {
          id,
          userRoleId: individualRoleId,
        },
        include: [{ model: Lookup, as: 'userRoleLookup', required: false }],
      });

      if (!user) {
        return null;
      }

      const updateFields: any = {};
      if (updateData.firstName !== undefined) updateFields.firstName = updateData.firstName;
      if (updateData.lastName !== undefined) updateFields.lastName = updateData.lastName;
      if (updateData.email !== undefined) updateFields.email = updateData.email;
      if (updateData.phoneNumber !== undefined) updateFields.mobileNumber = updateData.phoneNumber;
      if (updateData.isActive !== undefined) updateFields.isActive = updateData.isActive === IndividualStatus.ACTIVE;

      await user.update(updateFields);
      await user.reload({ include: [{ model: Lookup, as: 'userRoleLookup', required: false }] });

      return this._mapUserToIndividual(user);
    } catch (error) {
      throw new ApolloError(`Failed to update individual with ID ${id}: ${error.message}`, 'INDIVIDUAL_UPDATE_FAILED');
    }
  }

  private async _deleteIndividualById(id: string): Promise<boolean> {
    try {
      const individualRoleId = await this._getIndividualRoleLookupId();
      if (!individualRoleId) {
        return false;
      }

      const deleted = await User.destroy({
        where: {
          id,
          userRoleId: individualRoleId,
        },
      });
      return deleted > 0;
    } catch (error) {
      throw new ApolloError(`Failed to delete individual with ID ${id}: ${error.message}`, 'INDIVIDUAL_DELETION_FAILED');
    }
  }
}

export default IndividualRepository;

