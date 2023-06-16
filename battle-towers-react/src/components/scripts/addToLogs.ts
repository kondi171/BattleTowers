import { LogType } from "../../enums";
import { Log } from "../../types";

const addToLogs = (logs: Log[], content: string, type: LogType) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour12: false });
  logs.push({ content: content, type: type, time: timeString })
}

export default addToLogs;