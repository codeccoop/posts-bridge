import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import Edit from "./edit";
import metadata from "./block.json";
import "./style.scss";

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => {
    const blockProps = useBlockProps.save();
    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
