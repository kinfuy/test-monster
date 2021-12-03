import { EventMonster } from '../history';
import { IEventType } from './../types';
export interface MonsterEvent {
  id: string;
  url: string;
  eventList: Array<EventMonster>;
}

export type MonsterEventSet = Array<MonsterEvent>;

export interface TrayConfig {
  show: boolean;
}
export interface MontserConfig {
  tray: TrayConfig;
  operateDelay: number;
  recordEventType: Array<IEventType>;
}
