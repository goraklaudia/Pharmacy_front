import { PrescriptionElement } from "./PrescriptionElement";

export class Prescription{
    public id: String;
    public documentName: String;
    public dateOfIssue: Date;
    public dateOfFinalization: Date;
    public provider: String;
    public nipOrRegonOfTheProvider: String;
    public nameOfThePatient: String;
    public surnameOfThePatient: String;
    public addressOfThePatient: String;
    public peselNumberOfThePatient: String;
    public nameOfTheDoctor: String;
    public surnameOfTheDoctor: String;
    public specializationOfTheDoctor: String;
    public licenceNumberOfTheDoctor: String;
    public elements: PrescriptionElement[];
    public authorizationCode: String;

    public formattedDateOfIssue: String;
}
