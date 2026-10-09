import { BlobServiceClient } from "@azure/storage-blob";
import { IMatchData, IFormsPayload, IFormsPayloadAnswers } from "../interfaces";
import { calculateScore } from "./StatisticUtils";

export async function getMatchData(): Promise<IMatchData[]> {
  const matchData: IMatchData[] = [];

  const connectionString = `DefaultEndpointsProtocol=https;AccountName=backsnapperblobb;AccountKey=Od3lZ5NmWuPZjLhhT9EEhoAVZT7zrlf9eUdnfUmkl0iBfIfRCAgDINcxvjDGMRJZijiO7pxgmsY/+AStV3FNew==;EndpointSuffix=core.windows.net`;
  const containerName = "results";

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blockBlobClient = containerClient.getBlockBlobClient("matchData.json");

  const content = await blockBlobClient.downloadToBuffer();
  const formsPayload: IFormsPayload = JSON.parse(content.toString());

  formsPayload.value.forEach((item) => {
    const answers = JSON.parse(item.answers) as IFormsPayloadAnswers[];
    const match: IMatchData = {
      id: item.id.toString(),
      date: item.submitDate,
      player1: {
        name: answers[0].answer1,
        score: +answers[2].answer1,
        points: 0,
      },
      player2: {
        name: answers[1].answer1,
        score: +answers[3].answer1,
        points: 0,
      },
      comment: answers[4].answer1,
    };
    matchData.push(match);
  });

  const blobs = containerClient.listBlobsFlat();
  for await (const blob of blobs) {
    if (blob.name !== "matchData.json") {
      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      const content = await blockBlobClient.downloadToBuffer();
      const matchResult: IMatchData = JSON.parse(content.toString());
      matchData.push({
        ...matchResult,
        player1: {
          name: matchResult.player1.name,
          score: +matchResult.player1.score,
          points: 0,
        },
        player2: {
          name: matchResult.player2.name,
          score: +matchResult.player2.score,
          points: 0,
        },
      });
    }
  }

  const cleanedMatchData = matchData

    .filter(
      (e) =>
        e.player1.name !== "Ole" &&
        e.player2.name !== "Ole" &&
        e.player1.name !== "Toni" &&
        e.player2.name !== "Toni" &&
        e.player1.name !== "Michi" &&
        e.player2.name !== "Michi" &&
        e.player1.name !== "Hossein" &&
        e.player2.name !== "Hossein" &&
        e.player1.name !== "Denis" &&
        e.player2.name !== "Denis"
    )
    .filter((e) => e.comment?.toUpperCase() !== "DEBUG")
    .filter((e) => e.player1.score !== 0 || e.player2.score !== 0)
    .filter((e) => e.player1.name !== "" && e.player2.name !== "")
    .filter((e) => e.player1.score !== e.player2.score)
    .filter((e) => e.player1.name !== e.player2.name);

  calculateScore(
    cleanedMatchData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  );

  return cleanedMatchData;
}
