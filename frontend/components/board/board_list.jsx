import React from 'react';
import DropDown from '../element/drop_down';

class BoardList extends React.Component {
   constructor(props) {
      super(props);

      // this.state = this.props.boards;
      this.state = {
         location: [
            {
               id: 0,
               title: 'New York',
               selected: false,
               key: 'location'
            },
            {
               id: 1,
               title: 'Dublin',
               selected: false,
               key: 'location'
            },
            {
               id: 2,
               title: 'California',
               selected: false,
               key: 'location'
            },
            {
               id: 3,
               title: 'Istanbul',
               selected: false,
               key: 'location'
            },
            {
               id: 4,
               title: 'Izmir',
               selected: false,
               key: 'location'
            },
            {
               id: 5,
               title: 'Oslo',
               selected: false,
               key: 'location'
            },
            {
               id: 6,
               title: 'Zurich',
               selected: false,
               key: 'location'
            }
         ],
         fruit: [
            {
               id: 0,
               title: 'Apple',
               selected: false,
               key: 'fruit'
            },
            {
               id: 1,
               title: 'Orange',
               selected: false,
               key: 'fruit'
            },
            {
               id: 2,
               title: 'Grape',
               selected: false,
               key: 'fruit'
            },
            {
               id: 3,
               title: 'Pomegranate',
               selected: false,
               key: 'fruit'
            },
            {
               id: 4,
               title: 'Strawberry',
               selected: false,
               key: 'fruit'
            }
         ]
      };
      
      this.resetThenSet = this.resetThenSet.bind(this);
   }

   toggleSelected(id, key) {      
      let temp = JSON.parse(JSON.stringify(this.state[key]));
      
      temp[id].selected = !temp[id].selected;
      this.setState({
         [key]: temp
      });
   }

   resetThenSet(id, key) {      
      let temp = JSON.parse(JSON.stringify(this.state[key]));
      
      temp.forEach(item => (item.selected = false));
      temp[id].selected = true;
      this.setState({
         [key]: temp
      });      
   }

   render() {
      return (
         <div className='dropdown-board-list'>
            <div>
               <DropDown
                  title='Select fruit'
                  list={this.state.fruit}
                  resetThenSet={this.resetThenSet}
               />
            </div>
         </div>
      );
   }
}

export default BoardList;
