import React from 'react';

class BoardEditForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = { ...props.board, showErrors: false, serverError: props.errors };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);      
   }

   update(field) {      
      return e => {
         switch (field) {
            case 'name':                                                                                             
               this.setState({ [field]: e.target.value });   
               break;
            case 'secret':
               this.setState({ [field]: e.target.checked });
               break;
            default:
               break;
         }
      }
   }

   handleSubmit(e) {
      e.preventDefault();

      this.props.updateBoard(this.state)
         .then(this.props.hideModal());
   }

   handleDelete(e) {
      e.preventDefault();
      
      this.props.hideModal();      
      this.props.showModal({ name: 'delete-board-confirm', selectedData: this.props.boardId });         
   }      

   renderErrors() {
      if (this.props.errors === undefined) return '';      

      return (
         <ul>
            {this.props.errors.map((error, i) => (
               <li key={`error-${i}`}>
                  {error}
               </li>
            ))}
         </ul>
      );
   }

   renderBoardNameValidationError() {
      if (this.state.name === '' && this.state.showErrors === true) {
         return (
            <div className='error-text'>Don't forget to name your board!</div>
         )
      }      
   }

   render() {
      const isCreateButtonDisabled = (this.state.name === '') ? true : false;                  
      const createButtonStyle = (this.state.name === '') ? '' : 'create-btn-focus';                  
      const cancelButtonStyle = (this.state.name === '') ? '' : 'cancel-btn-unfocus';                  

      return (
         <div aria-label='Create' className='board-form-container'>
            <div className='header'>
               <h1>Edit your board</h1>
               <button
                  className='close-btn'
                  onClick={this.props.hideModal}
               >
                  <svg height='20' width='20' viewBox='0 0 24 24' aria-hidden='true' aria-label='' role='img'><path d='M15.18 12l7.16-7.16c.88-.88.88-2.3 0-3.18-.88-.88-2.3-.88-3.18 0L12 8.82 4.84 1.66c-.88-.88-2.3-.88-3.18 0-.88.88-.88 2.3 0 3.18L8.82 12l-7.16 7.16c-.88.88-.88 2.3 0 3.18.44.44 1.01.66 1.59.66.58 0 1.15-.22 1.59-.66L12 15.18l7.16 7.16c.44.44 1.01.66 1.59.66.58 0 1.15-.22 1.59-.66.88-.88.88-2.3 0-3.18L15.18 12z'></path></svg>
               </button>
            </div>
            <hr className='borderline' />
            <div className='body'>
               <form className='board-form'>
                  <div className='board-name'>
                     <p>Name</p>
                     <input
                        id='board-name-input'
                        className='input board-name'
                        value={this.state.name}
                        placeholder="E.g. 'Places to go' or 'Recipes to make'"
                        onChange={this.update('name')}
                        required
                     />
                     {this.renderBoardNameValidationError()}
                     <div className='error-text'>{this.renderErrors()}</div>
                  </div>

                  <hr className='borderline' />
                  <div className='board-visibility'>
                     <p>Visibility</p>
                     <div className='secret'>
                        <input className='secret-box' type='checkbox' checked={this.state.secret} onChange={this.update('secret')} />
                        <div>
                           <div className='secret-info'>Keep this board secret.</div>
                           <a href='https://www.pinterest.com/_/_/help/article/change-board-privacy?source=secret_create'>Learn more</a>
                        </div>
                     </div>
                  </div>
               </form>

               <hr className='borderline' />
               <div className='button-footer'>
                  <div className='button-group'>
                     <div className='left'>
                        <button
                           id='delete-btn'
                           className='delete-btn'
                           onClick={this.handleDelete} >
                           Delete
                        </button>
                     </div>
                     <div className='right'>
                        <button
                           id='cancel-btn'
                           className={'cancel-btn ' + cancelButtonStyle}
                           tabIndex='1'
                           onClick={this.props.hideModal} >
                           Cancel
                        </button>
                        <button
                           id='create-btn'
                           className={'create-btn ' + createButtonStyle}                       
                           disabled={isCreateButtonDisabled}
                           onClick={this.handleSubmit} > 
                           Save
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default BoardEditForm;

