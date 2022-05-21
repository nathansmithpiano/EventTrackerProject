export class GarminEvent {
  id: Number;
  type: String;
  date: String | null;
  title: String | null;
  distance: Number | null;
  calories: Number | null;
  time: String | null;
  hrAvg: Number | null;
  hrMax: Number | null;
  aerobicTe: Number | null;
  runCadenceAvg: Number | null;
  runCadenceMax: Number | null;
  paceAvg: String | null;
  ascent: Number | null;
  descent: Number | null;
  timeMoving: String | null;
  timeElapsed: String | null;
  elevationMin: Number | null;
  elevationMax: Number | null;

  constructor(
    id: Number,
    type: String,
    date: String | null = null,
    title: String | null = null,
    distance: Number | null = null,
    calories: Number | null = null,
    time: String | null = null,
    hrAvg: Number | null = null,
    hrMax: Number | null = null,
    aerobicTe: Number | null = null,
    runCadenceAvg: Number | null = null,
    runCadenceMax: Number | null = null,
    paceAvg: String | null = null,
    ascent: Number | null = null,
    descent: Number | null = null,
    timeMoving: String | null = null,
    timeElapsed: String | null = null,
    elevationMin: Number | null = null,
    elevationMax: Number | null = null
  ) {
    this.id = id;
    this.type = type;
    this.date = date;
    this.title = title;
    this.distance = distance;
    this.calories = calories;
    this.time = time;
    this.hrAvg = hrAvg;
    this.hrMax = hrMax;
    this.aerobicTe = aerobicTe;
    this.runCadenceAvg = runCadenceAvg;
    this.runCadenceMax = runCadenceMax;
    this.paceAvg = paceAvg;
    this.ascent = ascent;
    this.descent = descent;
    this.timeMoving = timeMoving;
    this.timeElapsed = timeElapsed;
    this.elevationMin = elevationMin;
    this.elevationMax = elevationMax;
  }
}
