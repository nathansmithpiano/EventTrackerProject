export class GarminEvent {
  id: number | null;
  type: string | null;
  date: string | null;
  title: string | null;
  distance: number | null;
  calories: number | null;
  time: string | null;
  hrAvg: number | null;
  hrMax: number | null;
  aerobicTe: number | null;
  runCadenceAvg: number | null;
  runCadenceMax: number | null;
  paceAvg: string | null;
  ascent: number | null;
  descent: number | null;
  timeMoving: string | null;
  timeElapsed: string | null;
  elevationMin: number | null;
  elevationMax: number | null;

  constructor(
    id: number | null = null,
    type: string | null = null,
    date: string | null = null,
    title: string | null = null,
    distance: number | null = null,
    calories: number | null = null,
    time: string | null = null,
    hrAvg: number | null = null,
    hrMax: number | null = null,
    aerobicTe: number | null = null,
    runCadenceAvg: number | null = null,
    runCadenceMax: number | null = null,
    paceAvg: string | null = null,
    ascent: number | null = null,
    descent: number | null = null,
    timeMoving: string | null = null,
    timeElapsed: string | null = null,
    elevationMin: number | null = null,
    elevationMax: number | null = null
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
