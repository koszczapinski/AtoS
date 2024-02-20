import { cleanDirectory } from "./utils";

const audioDir = "./audio";
const transcriptDir = "./transcripts";

cleanDirectory(audioDir).catch(console.error);
cleanDirectory(transcriptDir).catch(console.error);
