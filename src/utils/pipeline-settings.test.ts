import { REFETCH_ACTIVE_PIPELINE_INTERVAL } from "../constants";
import {
  PipelineSettingsFromServer,
  PublicPipelineSettingsFromServer,
} from "../types/pipeline-settings";
import {
  convertPipelineSettingsFromServer,
  convertPublicPipelineSettingsFromServer,
} from "./pipeline-settings";

describe("pipeline-settings", () => {
  describe("convertPipelineSettingsFromServer", () => {
    const createMockPipelineSettingsFromServer = (
      overrides: Partial<PipelineSettingsFromServer> = {},
    ): PipelineSettingsFromServer => ({
      id: "1",
      pipeline_id: "10",
      allow_only_last_stage_task_done: "0",
      pipeline_refresh_interval: "30",
      ...overrides,
    });

    it("should convert allow_only_last_stage_task_done from '1' to true", () => {
      const serverSettings = createMockPipelineSettingsFromServer({
        allow_only_last_stage_task_done: "1",
      });

      const result = convertPipelineSettingsFromServer(serverSettings);

      expect(result.allow_only_last_stage_task_done).toBe(true);
    });

    it("should convert allow_only_last_stage_task_done from '0' to false", () => {
      const serverSettings = createMockPipelineSettingsFromServer({
        allow_only_last_stage_task_done: "0",
      });

      const result = convertPipelineSettingsFromServer(serverSettings);

      expect(result.allow_only_last_stage_task_done).toBe(false);
    });

    it("should convert pipeline_refresh_interval from string to number", () => {
      const serverSettings = createMockPipelineSettingsFromServer({
        pipeline_refresh_interval: "60",
      });

      const result = convertPipelineSettingsFromServer(serverSettings);

      expect(result.pipeline_refresh_interval).toBe(60);
    });

    it("should use default interval when pipeline_refresh_interval is invalid", () => {
      const serverSettings = createMockPipelineSettingsFromServer({
        pipeline_refresh_interval: "invalid",
      });

      const result = convertPipelineSettingsFromServer(serverSettings);

      expect(result.pipeline_refresh_interval).toBe(
        REFETCH_ACTIVE_PIPELINE_INTERVAL,
      );
    });

    it("should use default interval when pipeline_refresh_interval is zero", () => {
      const serverSettings = createMockPipelineSettingsFromServer({
        pipeline_refresh_interval: "0",
      });

      const result = convertPipelineSettingsFromServer(serverSettings);

      expect(result.pipeline_refresh_interval).toBe(
        REFETCH_ACTIVE_PIPELINE_INTERVAL,
      );
    });

    it("should use default interval when pipeline_refresh_interval is negative", () => {
      const serverSettings = createMockPipelineSettingsFromServer({
        pipeline_refresh_interval: "-10",
      });

      const result = convertPipelineSettingsFromServer(serverSettings);

      expect(result.pipeline_refresh_interval).toBe(
        REFETCH_ACTIVE_PIPELINE_INTERVAL,
      );
    });

    it("should use default interval when pipeline_refresh_interval is empty string", () => {
      const serverSettings = createMockPipelineSettingsFromServer({
        pipeline_refresh_interval: "",
      });

      const result = convertPipelineSettingsFromServer(serverSettings);

      expect(result.pipeline_refresh_interval).toBe(
        REFETCH_ACTIVE_PIPELINE_INTERVAL,
      );
    });

    it("should preserve id and pipeline_id", () => {
      const serverSettings = createMockPipelineSettingsFromServer({
        id: "123",
        pipeline_id: "456",
      });

      const result = convertPipelineSettingsFromServer(serverSettings);

      expect(result.id).toBe("123");
      expect(result.pipeline_id).toBe("456");
    });

    it("should convert all fields correctly in a complete object", () => {
      const serverSettings = createMockPipelineSettingsFromServer({
        id: "5",
        pipeline_id: "15",
        allow_only_last_stage_task_done: "1",
        pipeline_refresh_interval: "45",
      });

      const result = convertPipelineSettingsFromServer(serverSettings);

      expect(result).toEqual({
        id: "5",
        pipeline_id: "15",
        allow_only_last_stage_task_done: true,
        pipeline_refresh_interval: 45,
      });
    });
  });

  describe("convertPublicPipelineSettingsFromServer", () => {
    const createMockPublicPipelineSettingsFromServer = (
      overrides: Partial<PublicPipelineSettingsFromServer> = {},
    ): PublicPipelineSettingsFromServer => ({
      allow_only_last_stage_task_done: "0",
      ...overrides,
    });

    it("should convert allow_only_last_stage_task_done from '1' to true", () => {
      const serverSettings = createMockPublicPipelineSettingsFromServer({
        allow_only_last_stage_task_done: "1",
      });

      const result = convertPublicPipelineSettingsFromServer(serverSettings);

      expect(result.allow_only_last_stage_task_done).toBe(true);
    });

    it("should convert allow_only_last_stage_task_done from '0' to false", () => {
      const serverSettings = createMockPublicPipelineSettingsFromServer({
        allow_only_last_stage_task_done: "0",
      });

      const result = convertPublicPipelineSettingsFromServer(serverSettings);

      expect(result.allow_only_last_stage_task_done).toBe(false);
    });

    it("should only contain allow_only_last_stage_task_done field", () => {
      const serverSettings = createMockPublicPipelineSettingsFromServer({
        allow_only_last_stage_task_done: "1",
      });

      const result = convertPublicPipelineSettingsFromServer(serverSettings);

      expect(Object.keys(result)).toEqual(["allow_only_last_stage_task_done"]);
    });
  });
});
