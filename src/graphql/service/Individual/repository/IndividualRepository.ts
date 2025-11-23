import { ApolloError } from 'apollo-server-express';
import { Op, WhereOptions } from 'sequelize';
import { Individual } from '../../../../db/models/individual.model';
import { IndividualFilterInput } from '../typedefs/Individual/inputs/IndividualFilterInput.schema';
import { CreateIndividualInput } from '../typedefs/Individual/inputs/CreateIndividualInput.schema';
import { UpdateIndividualInput } from '../typedefs/Individual/inputs/UpdateIndividualInput.schema';
import { IndividualOrm } from './orm/IndividualOrm';

class IndividualRepository {
  public createIndividual: (individualData: CreateIndividualInput) => Promise<IndividualOrm>;
  public deleteIndividualById: (id: string) => Promise<boolean>;
  public getIndividualById: (id: string) => Promise<IndividualOrm | null>;
  public getIndividuals: (filter: IndividualFilterInput) => Promise<{ individuals: IndividualOrm[]; total: number; page: number; limit: number; totalPages: number }>;
  public updateIndividualById: (id: string, updateData: UpdateIndividualInput) => Promise<IndividualOrm | null>;

  constructor() {
    this.createIndividual = this._createIndividual.bind(this);
    this.deleteIndividualById = this._deleteIndividualById.bind(this);
    this.getIndividualById = this._getIndividualById.bind(this);
    this.getIndividuals = this._getIndividuals.bind(this);
    this.updateIndividualById = this._updateIndividualById.bind(this);
  }

  private async _createIndividual(individualData: CreateIndividualInput): Promise<IndividualOrm> {
    try {
      const newIndividual = await Individual.create({
        email: individualData.email,
        firstName: individualData.firstName,
        individualId: individualData.individualId,
        isActive: individualData.isActive,
        lastName: individualData.lastName,
        phoneNumber: individualData.phoneNumber || null,
      });
      return newIndividual;
    } catch (error) {
      throw new ApolloError(`Failed to create individual: ${error.message}`, 'INDIVIDUAL_CREATION_FAILED');
    }
  }

  private async _getIndividualById(id: string): Promise<IndividualOrm | null> {
    try {
      const individual = await Individual.findOne({ where: { id } });
      return individual;
    } catch (error) {
      throw new ApolloError(`Failed to get individual: ${error.message}`, 'INDIVIDUAL_RETRIEVAL_FAILED');
    }
  }

  private async _getIndividuals(filter: IndividualFilterInput): Promise<{ individuals: IndividualOrm[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const page = filter.page || 1;
      const limit = filter.limit || 10;
      const offset = (page - 1) * limit;

      const where: WhereOptions = {};

      if (filter.status) {
        where.isActive = filter.status;
      }

      if (filter.search) {
        where[Op.or as any] = [
          { firstName: { [Op.iLike]: `%${filter.search}%` } },
          { lastName: { [Op.iLike]: `%${filter.search}%` } },
          { email: { [Op.iLike]: `%${filter.search}%` } },
          { individualId: { [Op.iLike]: `%${filter.search}%` } },
        ];
      }

      const { count, rows } = await Individual.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        where,
      });

      const totalPages = Math.ceil(count / limit);

      return {
        individuals: rows,
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
      const individual = await Individual.findOne({ where: { id } });
      if (individual) {
        await individual.update(updateData);
        return individual;
      }
      return null;
    } catch (error) {
      throw new ApolloError(`Failed to update individual with ID ${id}: ${error.message}`, 'INDIVIDUAL_UPDATE_FAILED');
    }
  }

  private async _deleteIndividualById(id: string): Promise<boolean> {
    try {
      const deleted = await Individual.destroy({ where: { id } });
      return deleted > 0;
    } catch (error) {
      throw new ApolloError(`Failed to delete individual with ID ${id}: ${error.message}`, 'INDIVIDUAL_DELETION_FAILED');
    }
  }
}

export default IndividualRepository;

