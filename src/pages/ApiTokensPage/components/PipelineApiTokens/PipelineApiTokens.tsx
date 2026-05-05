import { useApiTokens } from "../../../../hooks/useApiTokens";
import { PipelineApiToken } from "../PipelineApiToken/PipelineApiToken";

function PipelineApiTokens() {
  const { apiTokens } = useApiTokens();

  if (!apiTokens || apiTokens.length === 0) {
    return null;
  }

  return (
    <div className="wpqt-flex wpqt-flex-wrap wpqt-justify-center wpqt-gap-4">
      {apiTokens.map((apiToken) => (
        <div
          key={apiToken.id}
          className="wpqt-w-full md:wpqt-w-[calc(33%-0.5rem)] xl:wpqt-w-[calc(25%-0.75rem)] wpqt-flex"
        >
          <PipelineApiToken apiToken={apiToken} />
        </div>
      ))}
    </div>
  );
}

export { PipelineApiTokens };
