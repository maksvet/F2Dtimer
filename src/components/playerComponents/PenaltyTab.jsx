import React from "react";

class PenaltyTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
        let dashBoardClasses = ('penaltyDashboard');
    }
    toggleDashboard() {
        this.setState({ visible: !this.state.visible })
    }
    
    render() {
        return (
            <div className="penaltyTab">
                <p className="penaltyLabel" onClick={() => this.toggleDashboard()}>PENALTY</p>
                {//this.state.visible === true &&
                    <div className={this.state.visible?"penaltyDashboard":" penaltyDashboard hide"}>
                        <div className="playerPenalty">
                            <button className="penaltyButton" onClick={()=>this.props.deductPoints(this.props.player1, 20)}>-20</button>
                            <button className="penaltyButton">-50</button>
                        </div>
                        <div className="playerPenalty">
                            <button className="penaltyButton">-20</button>
                            <button className="penaltyButton">-50</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default PenaltyTab;