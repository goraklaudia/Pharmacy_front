import { PrescriptionElement } from "./PrescriptionElement";

export class Prescription{
    public pharmacistId: String;
    public prescriptionId: String;
    public dateOfIssue: Date;
    public addressOfThePatient: String;
    public dateOfFinalization: Date;
    public licenceNumberOfTheDoctor: String;
    public nameOfTheDoctor: String;
    public nameOfThePatient: String;
    public nipOrRegonOfTheProvider: String;
    public peselNumberOfThePatient: String;
    public provider: String;
    public specializationOfTheDoctor: String;
    public surnameOfTheDoctor: String;
    public surnameOfThePatient: String;
    public listOfPrescriptionElements: PrescriptionElement[];
    public verificationCode: String;

}