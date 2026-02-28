import { useApiTokens } from "../../../../hooks/useApiTokens";
import { PipelineApiToken } from "../PipelineApiToken/PipelineApiToken";

function PipelineApiTokens() {
  const { apiTokens } = useApiTokens();

  if (!apiTokens || apiTokens.length === 0) {
    return null;
  }

  return (
    <div className="wpqt-flex wpqt-flex-wrap wpqt-gap-6">
      {apiTokens.map((apiToken) => (
        <PipelineApiToken key={apiToken.id} apiToken={apiToken} />
      ))}
    </div>
  );
}

export { PipelineApiTokens };
