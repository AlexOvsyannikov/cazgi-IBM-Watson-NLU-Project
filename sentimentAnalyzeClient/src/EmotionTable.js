import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      //Returns the emotions as an HTML table
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                Object.entries(this.props.emotions).map(row => {
                    return (
                        <tr>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                        </tr>
                    )
                })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;