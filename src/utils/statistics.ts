export function hasEnoughDataCheck(stagesPieChartData: (string | number)[][]) {
  const stages: [string, number][] = stagesPieChartData.slice(1) as [
    string,
    number,
  ][];
  const hasAtLeastOneStageWithTasks = stages.some((stage) => stage[1] > 0);
  return stagesPieChartData.length > 1 && hasAtLeastOneStageWithTasks;
}
