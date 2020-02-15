import React from 'react';
import BoardIndex from '../board/board_index';
import PinIndexUserContainer from '../pin/pin_index_user_container';

class UserProfile extends React.Component {
  constructor(props) {
    super(props); 
    
    this.state = {
       tabItem: location.hash.includes('/pins') ? 'pins' : 'boards',
       dropDown: false
    };

    this.showDropDown = this.showDropDown.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showUserBoards = this.showUserBoards.bind(this);
    this.showUserPins = this.showUserPins.bind(this);    
  }

  // TODO: How to not fetch again if navigate back from board show
  componentDidMount() {               
    this.props.fetchUser(this.props.username);    
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user) {
      this.props.fetchUser(this.props.username);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.hideDropDown);
  }

  showDropDown(e) {    
    this.setState({ dropDown: true });
    document.addEventListener('mousedown', this.hideDropDown);
  }

  hideDropDown(e) {    
    if (!this.node.contains(e.target)) {
      this.setState({ dropDown: false });
      document.removeEventListener('mousedown', this.hideDropDown);
    }
  }

  renderDropDown() {    
    if (this.state.dropDown) {
      return (
         <div
            id="drop-down"
            ref={node => (this.node = node)}
            className="profile-add-board-pin drop-down"
         >
            <div className="frame">
               <div className="list" role="list">
                  <div
                     title="Create board"
                     className="create-board"
                     onClick={this.showModal({ name: "create-board" })}
                  >
                     Create board
                  </div>
                  <div title="Create pin" className="create-pin">
                     <a href="#/pin-builder">
                        Create Pin
                     </a>
                  </div>
               </div>
            </div>
         </div>
      );
    }
  }

  showModal(modal) {   
    return e => {
      this.props.showModal(modal);    
      this.hideDropDown(e);
    }
  }

  displayProfileToolbar() {
    if (this.props.user === this.props.currentUser) {
      return (
         <nav className="profile-toolbar">
            <div>
               <button
                  className="add-board-pin"
                  onClick={this.showDropDown}
                  aria-label="Add board or pin"
                  type="button"
               >
                  <svg
                     height="16"
                     width="16"
                     viewBox="0 0 24 24"
                     aria-hidden="true"
                     aria-label=""
                     role="img"
                  >
                     <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3M3 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm18 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"></path>
                  </svg>
               </button>
               {this.renderDropDown()}
            </div>
         </nav>
      );
    }
  }

  showUserBoards() {
    this.setState({ tabItem: 'boards' });    
  }

  showUserPins() {    
    this.setState({ tabItem: 'pins' });    
  }

  displayTabList() {    
    return (
       <nav>
          <button
             id='board-tab'
             onClick={this.showUserBoards.bind(this)}
             className={`board-tab ${this.state.tabItem==='boards' ? 'active' : ''}`}
          >
             Boards
          </button>          
          <button
            id='pin-tab'
            onClick={this.showUserPins.bind(this)}
            className={`pin-tab ${this.state.tabItem==='pins' ? 'active' : ''}`}
          >
            Pins
          </button>          
       </nav>
    );
  }

  renderChildComponent(user, userBoards, userPins, permitted) {    
    if (this.state.tabItem === 'boards') 
      return (
        <BoardIndex
          user={user}
          boards={userBoards}
          pins={userPins}
          permitted={permitted}
          showModal={this.props.showModal}
        />
      );
    else 
      return (
         <PinIndexUserContainer
            user={user}
            boards={userBoards}
            pins={userPins}
            permitted={permitted}
            showModal={this.props.showModal}
         />
      );
  }

  render() {
    const { user, permitted, boards, userPins, pins, pinIds} = this.props;    

    if (!user) return null;
    let userProfileName =
      user.first_name + ' ' + (user.last_name === null ? '' : user.last_name);        

    return (
      <div>
        <section className='user-profile-header'>
          <div className='tilted-pins'></div>
          <div className='user-profile-detail-container'>
            <div className='user-profile-avatar'>
              <div className='-pos'>
                <div className='-shadow-wrapper'>
                  <img
                    alt={userProfileName}
                    className='user-profile-image'
                    src={window.userProfile}
                  />
                </div>
              </div>
            </div>
            <div className='user-profile-detail'>
              <div className='user-profile-name'>
                <h5>{userProfileName}</h5>
              </div>
              <div className='user-boards-pins-count'>
                <div className='boards-count'>
                  <p className='boards-count-title'>Boards</p>
                  <p className='boards-count-number'>{boards.length}</p>
                </div>
                <div className='pins-count'>
                  <p className='boards-count-title'>Pins</p>
                  <p className='boards-count-number'>{userPins.length}</p>
                </div>
              </div>
            </div>
            {this.displayProfileToolbar()}
          </div>
        </section>
        <section className='tab-list'>{this.displayTabList()}</section>
        <section className='user-profile-content'>          
          {
            this.renderChildComponent(user, boards, userPins, permitted)             
          }
        </section>
      </div>
    );
  }
}

export default UserProfile;
