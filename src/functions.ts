import { connectToDatabase } from "./lib/mongo";
import User from "./models/User";
import { ApiResponse, Artist, Item, TimeRange, Track } from "./types";

export async function fetchApi<ResponseType>(token: string, endpoint: string) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    method: "GET",
  });

  return (await res.json()) as Promise<ApiResponse<ResponseType>>;
}

export function isTrack(obj: any): obj is Track {
  return "type" in obj && obj.type === "track";
}

export function isArtist(obj: any): obj is Artist {
  return "type" in obj && obj.type === "artist";
}

export function isSame(arr1: any[], arr2: any[]) {
  return (
    arr1.length == arr2.length &&
    arr1.every(function (element, index) {
      return element === arr2[index];
    })
  );
}

interface IType {
  id: string;
}

export function diff(oldArr: IType[], newArr: IType[]) {
  return newArr.map((x, index) => {
    const oldIndex = oldArr.findIndex((y) => y.id === x.id);
    return {
      id: x.id,
      change: index > oldArr.length - 1 ? 0 : oldIndex - index,
    };
  });
}

export async function createUser(id: string) {
  connectToDatabase();

  const exists = await User.exists({ _id: id });

  if (exists) return;

  await User.create({ _id: id });
}

export async function getDataDb(
  id: string,
  type: "artists" | "tracks",
  timeRange: TimeRange
) {
  connectToDatabase();
  await createUser(id);

  const data = await User.findById(id).then((x) => {
    if (x) {
      return x[type][timeRange];
    } else return [];
  });

  if (!data) return [];
  else return data;
}

export async function setDataDb(
  id: string,
  type: "artists" | "tracks",
  timeRange: TimeRange,
  data: Artist[] | Track[]
) {
  connectToDatabase();
  await createUser(id);

  const oldData = await User.findById(id).then((x) => {
    if (x) {
      return x[type][timeRange];
    } else return [];
  });

  const oldDataIds = oldData.map((x) => x.id);
  const newData = data.map((x) => x.id);
  const oldDataChanges = oldData.map(
    (x) => ({ id: x.id, change: x.change } as Item)
  );
  const newDataChanges = data.map((x) => ({ id: x.id, change: 0 } as Item));

  if (oldDataIds.length === 0) {
    return await User.updateOne(
      { _id: id },
      {
        $set: {
          lastUpdated: Date.now(),
          [`${type}.${timeRange}`]: data.map(
            (x) =>
              ({ id: x.id, change: 0, new: false, hasChanged: false } as Item)
          ),
        },
      }
    );
  } else if (isSame(oldDataIds, newData)) return;
  else {
    const difference = diff(oldDataChanges, newDataChanges);

    const arr = difference.map((x) => {
      const oldObj = oldData.find((y) => y.id === x.id);
      const isNew = oldObj ? false : true;

      const obj: Item = {
        ...x,
        new: isNew,
        change: isNew ? 0 : x.change,
        hasChanged: x.change !== oldObj?.change,
      };

      return obj;
    });

    return await User.updateOne(
      { _id: id },
      {
        $set: {
          lastUpdated: Date.now(),
          [`${type}.${timeRange}`]: arr,
        },
      }
    );
  }
}

export async function getLastUpdated(id: string) {
  connectToDatabase();
  await createUser(id);

  const data = await User.findById(id).then((x) => {
    if (x) {
      return x.lastUpdated;
    } else return 0;
  });

  if (!data) return 0;
  else return data;
}
