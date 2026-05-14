import apiFetch from "@wordpress/api-fetch";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
  PanelBody,
  SelectControl,
  Spinner,
  TextControl,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import PublicTaskForm from "./PublicTaskForm";

export default function Edit({ attributes, setAttributes }) {
  const { pipelineId, submitLabel, successMessage } = attributes;
  const blockProps = useBlockProps();
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch({ path: "/wpqt/v1/pipelines" })
      .then((res) => {
        const list = (res && res.data) || [];
        setPipelines(list);
      })
      .catch((e) => {
        setError(e.message || __("Failed to load boards.", "quicktasker"));
      })
      .finally(() => setLoading(false));
  }, []);

  const selectedPipeline = pipelines.find(
    (p) => parseInt(p.id, 10) === parseInt(pipelineId, 10),
  );

  const options = [
    { label: __("— Select a board —", "quicktasker"), value: "0" },
    ...pipelines.map((p) => ({ label: p.name, value: String(p.id) })),
  ];

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody
          title={__("Board settings", "quicktasker")}
          initialOpen={true}
        >
          {loading ? (
            <Spinner />
          ) : error ? (
            <p style={{ color: "#b32d2e" }}>{error}</p>
          ) : (
            <SelectControl
              label={__("Board", "quicktasker")}
              value={String(pipelineId || 0)}
              options={options}
              onChange={(value) =>
                setAttributes({ pipelineId: parseInt(value, 10) || 0 })
              }
            />
          )}
          <TextControl
            label={__("Submit button label", "quicktasker")}
            value={submitLabel}
            onChange={(value) => setAttributes({ submitLabel: value })}
          />
          <TextControl
            label={__("Success message", "quicktasker")}
            value={successMessage}
            onChange={(value) => setAttributes({ successMessage: value })}
          />
        </PanelBody>
      </InspectorControls>
      <div
        style={{
          border: "1px dashed #c3c4c7",
          padding: "16px",
          borderRadius: "4px",
          background: "#f6f7f7",
        }}
      >
        {!selectedPipeline && (
          <p style={{ margin: 0, color: "#50575e", fontSize: "12px" }}>
            {__(
              "Pick a board in the block sidebar to start accepting submissions.",
              "quicktasker",
            )}
          </p>
        )}
        {selectedPipeline && (
          <div style={{ pointerEvents: "none", opacity: 0.85 }}>
            <PublicTaskForm
              pipelineId={pipelineId}
              submitLabel={submitLabel || __("Submit task", "quicktasker")}
              successMessage={
                successMessage ||
                __("Thanks! Your task has been submitted.", "quicktasker")
              }
              preview
            />
          </div>
        )}
      </div>
    </div>
  );
}
