import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import isEmpty from "lodash/isEmpty";
import {
  removeItem,
  dragItem,
  showEditor
} from "../../../actions/formBuilderActions";
import FormInputs from "./SortableFormInputs";
import FinalFormPreview from "./FinalFormPreview";

// DropTarget parameters
const type = () => "items";

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  item: monitor.getItem()
});

class Preview extends Component {
  


  render() {
    const {
      hovered,
      dragItem,
      onSubmit,
      removeItem,
      showEditor,
      previewItems,
      connectDropTarget
    } = this.props;

    const border = hovered ? "1px solid green" : "1px solid #ccc";

    return connectDropTarget(
      <div style={{ height: "100%" }} className="mt-3">
        
        <div style={{ height: "100%" }}>
          <div style={{ height: "50px" }}>
            <h3 className="float-left">Form Builder</h3>
            <button
              className="btn btn-danger float-right ml-3"
              onClick={() => onSubmit(JSON.stringify(previewItems))}
              disabled={isEmpty(previewItems)}
            >
              Create Form
            </button>
          </div>
          <div
            className="jumbotron bg-default"
            style={{ border, minHeight: "80vh" }}
          >
            {isEmpty(previewItems) && (
              <h3 className="list-group-item bg-theme text-center text-muted">
                Select / Drop an item from Toolbox
              </h3>
            )}

            {!isEmpty(previewItems) &&
              previewItems.map((item, i) => (
                <FormInputs
                  index={i}
                  item={item}
                  id={item.id}
                  key={item.id}
                  dragItem={dragItem}
                  removeItem={removeItem}
                  showEditor={showEditor}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      previewItems: state.formBuilder.previewItems
    }),
    {
      removeItem,
      dragItem,
      showEditor
    }
  ),
  DropTarget(type, {}, collect)
)(Preview);
