import type { LocalStorageAllWordinfoKeysKey } from "~/app/types/localstorageTypes";

export const localStoragePrefix = "eng-system_";
export const localStorageWordinfokeyskey: LocalStorageAllWordinfoKeysKey = `${localStoragePrefix}wordinfoKeys`;
export const localStorageWordinfokeyPrefix = `${localStoragePrefix}wordinfo+`;
export const localStorageTestResultKey = (dateNow:number) => `${localStoragePrefix}testresults_${dateNow}`