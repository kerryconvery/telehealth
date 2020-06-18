import AddClientDto from "../../domain/dto/AddClientDto";

export default class ClientMapper {
  static toCreateNewClientRequest(data: any): AddClientDto {
    return { 
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    }
  }
}