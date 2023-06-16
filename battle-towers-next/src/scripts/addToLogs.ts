import { LogType } from "@/typescript/enums";
import { Log } from "@/typescript/types";

const addToLogs = (logs: Log[], content: string, type: LogType) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour12: false });
  logs.push({ content: content, type: type, time: timeString })
}

export default addToLogs;