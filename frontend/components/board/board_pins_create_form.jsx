import React from 'react';
import BoardList from '../board/board_list';

class BoardPinsCreateForm extends React.Component {
   constructor(props) {
      super(props);
   }



   render() {
      
      return (
         <div className="bp-create-form-container">
            <div className="bp-create-form">
               <div className="bp-create-form-header">
                  <h1>Choose board</h1>
                  <button className="close-btn" onClick={this.props.hideModal}>
                     <svg
                        height="20"
                        width="20"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        aria-label=""
                        role="img"
                     >
                        <path d="M15.18 12l7.16-7.16c.88-.88.88-2.3 0-3.18-.88-.88-2.3-.88-3.18 0L12 8.82 4.84 1.66c-.88-.88-2.3-.88-3.18 0-.88.88-.88 2.3 0 3.18L8.82 12l-7.16 7.16c-.88.88-.88 2.3 0 3.18.44.44 1.01.66 1.59.66.58 0 1.15-.22 1.59-.66L12 15.18l7.16 7.16c.44.44 1.01.66 1.59.66.58 0 1.15-.22 1.59-.66.88-.88.88-2.3 0-3.18L15.18 12z"></path>
                     </svg>
                  </button>
               </div>
               <div className="bp-create-form-body">
                  <div className="bp-form-left">
                     <img
                        className="bp-form-pic"
                        src={this.props.pin.pictureUrl}
                     />                     
                  </div>
                  <div className="bp-form-right">
                     <BoardList />
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default BoardPinsCreateForm;