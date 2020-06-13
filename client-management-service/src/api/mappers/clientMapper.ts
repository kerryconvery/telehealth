import CreateNewClientRequest from "../../domain/dto/createNewClientRequest";

export default class ClientMapper {
  static toCreateNewClientRequest(data: any): CreateNewClientRequest {
    return { 
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    }
  }
}