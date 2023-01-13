import React from "react";
import { Spinner, Modal } from "flowbite-react";
const Loading = ({ loading }) => (
  <>
    {loading ? (
      <Modal show={loading} popup={true}>
        <Modal.Body >
      
            <div className="text-center ">
              <Spinner size="xl"/>
            </div>
    
        </Modal.Body>
      </Modal>
    ) : null}
  </>
);
export default Loading;
