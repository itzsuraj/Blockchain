class RailwayFrom {
  constructor(
    trainNumber,
    onBoardStationCode,
    destinationStationCode,
    journeyDate
  ) {
    this.timestamp = new Date();
    this.trainNumber = trainNumber;
    this.onBoardStationCode = onBoardStationCode;
    this.destinationStationCode = destinationStationCode;
    this.journeyDate = journeyDate;
    this.listOfPassangers = [];
  }
  addPassanger(name, age, seatPreference, gender) {
    this.listOfPassangers.push({
      name,
      age,
      seatPreference,
      gender,
      status: "Pending",
    });
  }
  getPassangerList() {
    return this.listOfPassangers;
  }
  bookSeat() {
    this.listOfPassangers = this.listOfPassangers.map((i) => {
      i.status = "booked";
      return i;
    });
  }
  cancelTicket(passangerName) {
    this.listOfPassangers = this.listOfPassangers.map((i) => {
      if (i.name === passangerName) {
        i.status = "cancelled";
      }
      return i;
    });
  }
}
const surajForm = new RailwayFrom("1234", "LTT", "Pune", new Date());
console.log(surajForm);
surajForm.addPassanger("Suraj", "29", "LB", "M");
surajForm.addPassanger("Shailesh", "28", "LB", "M");
surajForm.addPassanger("Shamika", "29", "LB", "F");
const pList = surajForm.getPassangerList(); 
surajForm.bookSeat();
surajForm.cancelTicket("Shailesh");
console.log("After Cancelling", pList);

// student registration FormData
// fullname
// Age
// events data 
// statuss
// cancel