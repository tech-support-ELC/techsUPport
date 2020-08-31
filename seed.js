"use strict";

const db = require("./server/db/db");
const {
  Condition,
  Score,
  Doctor,
  Appointment,
  Medication,
  User,
} = require("./server/db/models");
async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const userData = [
    {
      email: "cody@email.com",
      password: "123",
      firstName: "Cody",
      lastName: "Pug",
      isAdmin: true,
    },
    {
      email: "murphy@email.com",
      password: "123",
      firstName: "Murphy",
      lastName: "Doe",
    },
    {
      email: "khorley4@pinterest.com",
      password: "ghd4MhtErzZ",
      firstName: "Karney",
      lastName: "Horley",
    },
    {
      email: "hborthram5@umn.edu",
      password: "G6NW1ZcHe2K",
      firstName: "Hilary",
      lastName: "Borthram",
    },
    {
      email: "jmauger6@usnews.com",
      password: "jD1UOELG9",
      firstName: "Jackson",
      lastName: "Mauger",
    },
    {
      email: "aedgehill7@cocolog-nifty.com",
      password: "BUso8per",
      firstName: "Atlante",
      lastName: "Edgehill",
    },
    {
      email: "kmotto8@chronoengine.com",
      password: "0QTZdYRFEC21",
      firstName: "Kamilah",
      lastName: "Motto",
    },
    {
      email: "cradborne9@icio.us",
      password: "RIUO3qbi",
      firstName: "Cos",
      lastName: "Radborne",
    },
    {
      email: "gwilkinsona@dailymail.co.uk",
      password: "QGCNSiihR3",
      firstName: "Gabriel",
      lastName: "Wilkinson",
    },
    {
      email: "cgrealyb@google.fr",
      password: "L5vNtg",
      firstName: "Clayborn",
      lastName: "Grealy",
    },
    {
      email: "jbleasc@webs.com",
      password: "rHpFptO",
      firstName: "Janos",
      lastName: "Bleas",
    },
    {
      email: "lsciacovellid@census.gov",
      password: "Cf3XXY8B2y",
      firstName: "Leonore",
      lastName: "Sciacovelli",
    },
    {
      email: "ssamse@e-recht24.de",
      password: "d3kns0B718",
      firstName: "Salaidh",
      lastName: "Sams",
    },
  ];

  const users = await Promise.all([
    User.bulkCreate(userData, { validate: true }),
  ]);

  const conditionData = [
    {
      name: "Hypertension",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 1,
    },
    {
      name: "Hypertension",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 5,
    },
    {
      name: "Major Depression",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 5,
    },
    {
      name: "Hypertension",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 3,
    },
    {
      name: "Hypertension",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 11,
    },
    {
      name: "Major Depression",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 11,
    },
    {
      name: "Hypertension",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 2,
    },
    {
      name: "Hypertension",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 8,
    },
    {
      name: "Hypertension",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 7,
    },
    {
      name: "High Cholesterol",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 11,
    },
    {
      name: "Major Depression",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 1,
    },
    {
      name: "High Cholesterol",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 1,
    },
    {
      name: "High Cholesterol",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 5,
    },
    {
      name: "Hypertension",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 13,
    },
    {
      name: "Type 2 Diabetes",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 5,
    },
    {
      name: "Major Depression",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 8,
    },
    {
      name: "High Cholesterol",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 8,
    },
    {
      name: "Type 2 Diabetes",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 13,
    },
    {
      name: "Substance Use Disorder",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 1,
    },
    {
      name: "Psychotic Disorder",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 5,
    },
    {
      name: "Major Depression",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 2,
    },
    {
      name: "Alcohol Use Disorder",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 13,
    },
    {
      name: "Coronary Artery Disease",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 13,
    },
    {
      name: "Chronic Obstructive Pulmonary Disease",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 10,
    },
    {
      name: "Major Depression",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 12,
    },
    {
      name: "Alcohol Use Disorder",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 8,
    },
    {
      name: "High Cholesterol",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 6,
    },
    {
      name: "Major Depression",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 7,
    },
    {
      name: "Coronary Artery Disease",
      diagnosed: "yes",
      typeOfPain: "physical",
      userId: 2,
    },
    {
      name: "Major Depression",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 6,
    },
    {
      name: "Alcohol Use Disorder",
      diagnosed: "yes",
      typeOfPain: "mental health",
      userId: 1,
    },
  ];

  const conditions = await Promise.all([
    Condition.bulkCreate(conditionData, { validate: true }),
  ]);

  const doctorData = [
    {
      firstName: "Aretha",
      lastName: "Magill",
      address: "05171 1st Lane",
      doctorType: "Cardiologist",
      userId: 1,
    },
    {
      firstName: "Aretha",
      lastName: "Magill",
      address: "05171 1st Lane",
      doctorType: "Cardiologist",
      userId: 3,
    },
    {
      firstName: "Glynn",
      lastName: "Kleinmann",
      address: "6867 Tennessee Crossing",
      doctorType: "Cardiologist",
      userId: 8,
    },
    {
      firstName: "Glynn",
      lastName: "Kleinmann",
      address: "6867 Tennessee Crossing",
      doctorType: "Cardiologist",
      userId: 11,
    },
    {
      firstName: "Bernice",
      lastName: "Bannell",
      address: "37 Goodland Junction",
      doctorType: "Cardiologist",
      userId: 7,
    },
    {
      firstName: "Bernice",
      lastName: "Bannell",
      address: "37 Goodland Junction",
      doctorType: "Cardiologist",
      userId: 2,
    },
    {
      firstName: "Lorine",
      lastName: "Bardnam",
      address: "4 Reindahl Alley",
      doctorType: "Cardiologist",
      userId: 13,
    },
    {
      firstName: "Lorine",
      lastName: "Bardnam",
      address: "4 Reindahl Alley",
      doctorType: "Cardiologist",
      userId: 5,
    },
    {
      firstName: "Ches",
      lastName: "Milius",
      address: "64936 Bay Lane",
      doctorType: "Psychiatrist",
      userId: 1,
    },
    {
      firstName: "Ches",
      lastName: "Milius",
      address: "64936 Bay Lane",
      doctorType: "Psychiatrist",
      userId: 11,
    },
    {
      firstName: "Finn",
      lastName: "Lujan",
      address: "1340 Barnett Road",
      doctorType: "Psychiatrist",
      userId: 5,
    },
    {
      firstName: "Finn",
      lastName: "Lujan",
      address: "1340 Barnett Road",
      doctorType: "Psychiatrist",
      userId: 8,
    },
    {
      firstName: "Delphine",
      lastName: "Adne",
      address: "162 Debra Point",
      doctorType: "Psychiatrist",
      userId: 2,
    },
    {
      firstName: "Delphine",
      lastName: "Adne",
      address: "162 Debra Point",
      doctorType: "Psychiatrist",
      userId: 12,
    },
    {
      firstName: "Chilton",
      lastName: "Eltone",
      address: "621 Artisan Avenue",
      doctorType: "Psychiatrist",
      userId: 7,
    },
    {
      firstName: "Chilton",
      lastName: "Eltone",
      address: "621 Artisan Avenue",
      doctorType: "Psychiatrist",
      userId: 6,
    },
    {
      firstName: "Sayer",
      lastName: "Willmett",
      address: "76 Dayton Plaza",
      doctorType: "Endocrinologist",
      userId: 13,
    },
    {
      firstName: "Sayer",
      lastName: "Willmett",
      address: "76 Dayton Plaza",
      doctorType: "Endocrinologist",
      userId: 5,
    },
    {
      firstName: "Chicky",
      lastName: "Beamson",
      address: "5 Dunning Court",
      doctorType: "Pulmonologists",
      userId: 10,
    },
    {
      firstName: "Franny",
      lastName: "Rowen",
      address: "8094 Arapahoe Terrace",
      doctorType: "Cardiologist",
      userId: 2,
    },
    {
      firstName: "Sancho",
      lastName: "MacElharge",
      address: "60416 Milwaukee Drive",
      doctorType: "Cardiologist",
      userId: 13,
    },
    {
      firstName: "Jan",
      lastName: "Dowthwaite",
      address: "1 Darwin Avenue",
      doctorType: "Psychologist",
      userId: 5,
    },
    {
      firstName: "Pyotr",
      lastName: "O'Carmody",
      address: "46 Graedel Street",
      doctorType: "Psychologist",
      userId: 1,
    },
    {
      firstName: "Pat",
      lastName: "Nevitt",
      address: "618 Amoth Point",
      doctorType: "Cardiologist",
      userId: 13,
    },
  ];

  const doctors = await Promise.all([
    Doctor.bulkCreate(doctorData, { validate: true }),
  ]);

  const scoreData = [
    {
      date: "2020-07-01",
      notes:
        "ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque",
      rate: 7,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-02",
      notes: "risus. Nulla eget metus eu erat semper rutrum. Fusce dolor",
      rate: 7,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-03",
      notes:
        "cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula",
      rate: 3,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-04",
      notes: "rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida",
      rate: 8,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-05",
      notes:
        "pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer",
      rate: 1,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-06",
      notes:
        "venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien.",
      rate: 4,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-07",
      notes: "adipiscing lobortis risus. In mi pede, nonummy ut, molestie in,",
      rate: 3,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-08",
      notes:
        "Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor",
      rate: 6,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-09",
      notes:
        "odio tristique pharetra. Quisque ac libero nec ligula consectetuer rhoncus.",
      rate: 8,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-10",
      notes:
        "consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus.",
      rate: 2,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-11",
      notes:
        "pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna.",
      rate: 5,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-12",
      notes: "dictum placerat, augue. Sed molestie. Sed id risus quis diam",
      rate: 2,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-13",
      notes:
        "massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices",
      rate: 9,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-14",
      notes: "tellus non magna. Nam ligula elit, pretium et, rutrum non,",
      rate: 7,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-15",
      notes:
        "egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor",
      rate: 10,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-16",
      notes:
        "tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse",
      rate: 6,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-17",
      notes:
        "imperdiet dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit,",
      rate: 5,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-18",
      notes:
        "molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare,",
      rate: 8,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-19",
      notes:
        "sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor",
      rate: 7,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-20",
      notes: "elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris",
      rate: 3,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-21",
      notes: "ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius",
      rate: 7,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-22",
      notes:
        "Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare",
      rate: 1,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-23",
      notes:
        "Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a,",
      rate: 2,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-24",
      notes:
        "interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus",
      rate: 1,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-25",
      notes:
        "facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant",
      rate: 2,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-26",
      notes: "dolor vitae dolor. Donec fringilla. Donec feugiat metus sit amet",
      rate: 3,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-27",
      notes: "consequat enim diam vel arcu. Curabitur ut odio vel est",
      rate: 10,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-28",
      notes:
        "elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu",
      rate: 5,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-29",
      notes: "at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque",
      rate: 4,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-30",
      notes:
        "faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend.",
      rate: 2,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-07-31",
      notes: "odio. Nam interdum enim non nisi. Aenean eget metus. In",
      rate: 4,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-01",
      notes:
        "ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida",
      rate: 3,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-02",
      notes:
        "amet, consectetuer adipiscing elit. Aliquam auctor, velit eget laoreet posuere,",
      rate: 7,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-03",
      notes:
        "pretium aliquet, metus urna convallis erat, eget tincidunt dui augue",
      rate: 1,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-04",
      notes:
        "Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci,",
      rate: 5,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-05",
      notes:
        "magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam",
      rate: 8,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-06",
      notes: "Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra.",
      rate: 7,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-07",
      notes: "lectus ante dictum mi, ac mattis velit justo nec ante.",
      rate: 10,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-08",
      notes:
        "porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo",
      rate: 10,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-09",
      notes: "dis parturient montes, nascetur ridiculus mus. Proin vel arcu eu",
      rate: 10,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-10",
      notes:
        "turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus.",
      rate: 3,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-11",
      notes:
        "elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu",
      rate: 10,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-12",
      notes:
        "Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor",
      rate: 2,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-13",
      notes:
        "Aenean egestas hendrerit neque. In ornare sagittis felis. Donec tempor,",
      rate: 1,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-14",
      notes:
        "at pretium aliquet, metus urna convallis erat, eget tincidunt dui",
      rate: 3,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-15",
      notes:
        "semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque",
      rate: 8,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-16",
      notes:
        "Integer in magna. Phasellus dolor elit, pellentesque a, facilisis non,",
      rate: 6,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-17",
      notes: "eget metus eu erat semper rutrum. Fusce dolor quam, elementum",
      rate: 2,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-18",
      notes:
        "aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in",
      rate: 2,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-19",
      notes: "euismod enim. Etiam gravida molestie arcu. Sed eu nibh vulputate",
      rate: 8,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-20",
      notes: "dictum eu, placerat eget, venenatis a, magna. Lorem ipsum dolor",
      rate: 10,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-21",
      notes:
        "Duis elementum, dui quis accumsan convallis, ante lectus convallis est,",
      rate: 5,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-22",
      notes: "erat, eget tincidunt dui augue eu tellus. Phasellus elit pede,",
      rate: 9,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-23",
      notes: "porttitor interdum. Sed auctor odio a purus. Duis elementum, dui",
      rate: 9,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-24",
      notes:
        "et, commodo at, libero. Morbi accumsan laoreet ipsum. Curabitur consequat,",
      rate: 8,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-25",
      notes:
        "lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus.",
      rate: 5,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-26",
      notes:
        "augue porttitor interdum. Sed auctor odio a purus. Duis elementum,",
      rate: 10,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-27",
      notes:
        "dis parturient montes, nascetur ridiculus mus. Aenean eget magna. Suspendisse",
      rate: 10,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-28",
      notes: "Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae,",
      rate: 7,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-29",
      notes:
        "quis diam. Pellentesque habitant morbi tristique senectus et netus et",
      rate: 8,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-30",
      notes:
        "eros non enim commodo hendrerit. Donec porttitor tellus non magna.",
      rate: 1,
      conditionId: 1,
      userId: 1,
    },
    {
      date: "2020-08-31",
      notes:
        "mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris",
      rate: 2,
      conditionId: 1,
      userId: 1,
    },
  ];

  const scores = await Promise.all([
    Score.bulkCreate(scoreData, { validate: true }),
  ]);
  const medicationData = [
    {
      name: "Advil",
      dosage: "400 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Ibuprofen",
      dosage: "400 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Synthroid",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Crestor",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Ventolin",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Nexium",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Advair Diskus",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Lantus",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Vyvanse",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Lyrica",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Spiriva",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Januvia",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 1
    },
    {
      name: "Ibuprofen",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 2
    },
    {
      name: "Ibuprofen",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 3
    },
    {
      name: "Ibuprofen",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 4
    },
    {
      name: "Ibuprofen",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 5
    },
    {
      name: "Ibuprofen",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 6
    },
    {
      name: "Ibuprofen",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 7
    },
    {
      name: "Ibuprofen",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 8
    },
    {
      name: "Ibuprofen",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 9
    },
    {
      name: "Lantus",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 2
    },
    {
      name: "Lantus",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 3
    },
    {
      name: "Lantus",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 4
    },
    {
      name: "Lantus",
      dosage: "25 mg",
      frequency: "once per day",
      userId: 5
    },
  ];

  const medications = await Promise.all([
    Medication.bulkCreate(medicationData, { validate: true }),
  ]);

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
