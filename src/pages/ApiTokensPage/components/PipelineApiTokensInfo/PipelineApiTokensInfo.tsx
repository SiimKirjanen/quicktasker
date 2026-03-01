import { __, sprintf } from "@wordpress/i18n";
import { useApiTokens } from "../../../../hooks/useApiTokens";

function PipelineApiTokensInfo() {
  const { apiTokens } = useApiTokens();
  const apiTokensLength = apiTokens?.length || 0;

  if (apiTokensLength === 0) {
    return (
      <p>
        {__("There are no API tokens created for this board.", "quicktasker")}
      </p>
    );
  }

  return (
    <p>
      {sprintf(
        /* translators: %d: number of API tokens */
        __("There are %d API tokens created for this board.", "quicktasker"),
        apiTokensLength,
      )}
    </p>
  );
}

export { PipelineApiTokensInfo };
