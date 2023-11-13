class Studentregistrationform{
    constructor(firstname,lastname,age,gender){
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.age = gender;
    }
    getStudentlist(){
        return this.firstname
    }
}
const student = new Studentregistrationform("Suraj","Kadam","29","M");
console.log(student);
console.log(student.getStudentlist());




