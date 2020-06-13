import Client from '../../domain/domain-models/client';

export default class ClientMapper {
  static toClient(dbRow: any): Client {
    return {
      id: dbRow.id,
      title: dbRow.title,
      firstName: dbRow.first_name,
      lastName: dbRow.last_name,
      phoneNumber: dbRow.phone_number,
    }
  }
}