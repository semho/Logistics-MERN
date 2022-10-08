/**
 * model Destination
 */

export interface ISettingsDestination {
  from: string;
  to: string;
  distance: number;
  sender: string;
  recipient: string;
  owner: string;
  __v: number;
  _id: string;
}
export const initialSettingsDestination: ISettingsDestination = {
  from: "",
  to: "",
  sender: "",
  recipient: "",
  distance: Number(),
  owner: "",
  __v: Number(),
  _id: "",
};

export interface ISettingsDestinationShort {
  from: string;
  to: string;
  distance: number;
  sender: string;
  recipient: string;
}

export const initialSettingsDestinationShort: ISettingsDestinationShort = {
  from: "",
  to: "",
  sender: "",
  recipient: "",
  distance: Number(),
};

export interface IListSettingDestination extends Array<ISettingsDestination> {}

export const namesTableDestination = [
  "#",
  "Откуда->Куда",
  "Кто->Кому",
  "Расстояние, км",
  "Действия",
];

export const initialBodyTableDestination = [
  {
    id: "#",
    fromTo: "Откуда->Куда",
    senderToRecipient: "Кто->Кому",
    distance: 0,
    type: "destination",
  },
];

export const dataConversionDestination = (list: ISettingsDestination[]) => {
  return list.map((record) => {
    return {
      id: record._id,
      fromTo: `${record.from} -> ${record.to}`,
      senderToRecipient: `${record.sender} -> ${record.recipient}`,
      distance: record.distance,
      type: "destination",
    };
  });
};
