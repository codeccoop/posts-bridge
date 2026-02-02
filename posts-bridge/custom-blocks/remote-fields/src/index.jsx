import Edit from "./edit";
import metadata from "./block.json";

import "./style.css";

const { useBlockProps, InnerBlocks } = wp.blockEditor;

wp.blocks.registerBlockType(metadata.name, {
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
