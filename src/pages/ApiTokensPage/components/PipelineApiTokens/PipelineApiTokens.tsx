import { useApiTokens } from "../../../../hooks/useApiTokens";
import { PipelineApiToken } from "../PipelineApiToken/PipelineApiToken";

function PipelineApiTokens() {
  const { apiTokens } = useApiTokens();

  if (!apiTokens || apiTokens.length === 0) {
    return null;
  }

  return (
    <div className="wpqt-grid wpqt-grid-cols-1 md:wpqt-grid-cols-2 xl:wpqt-grid-cols-3 wpqt-gap-4">
      {apiTokens.map((apiToken) => (
        <PipelineApiToken key={apiToken.id} apiToken={apiToken} />
      ))}
    </div>
  );
}

export { PipelineApiTokens };
