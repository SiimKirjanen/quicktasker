import { registerBlockType } from "@wordpress/blocks";
import iconUrl from "../../../img/icon-80x80.png";
import metadata from "./block.json";
import Edit from "./edit";

registerBlockType(metadata.name, {
  ...metadata,
  icon: <img src={iconUrl} alt="" width={24} height={24} />,
  edit: Edit,
  save: () => null,
});
