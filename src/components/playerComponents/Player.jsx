import React from "react";
import planeIcon from "../../assets/planeIcon.png";
import flagIcon from "../../assets/flagIcon.png";
class Player extends React.Component {
    render() {
        return (
            <div className={this.props.TacticalLandingApproved?"landingApproved":""}>
            <div className={"playerBoard " + this.props.Border}>
                <div className="ScoreBoard">
                    <div className={this.props.HasAdvantage ? "advantage" : ""}> {this.props.Score}</div>
                    {this.props.HasAdvantage && <img className="flagIcon" src={flagIcon} />}</div>
                <div className="planeIcon" onClick={() => this.props.flipStatus()}>
                    <div className="planeStatus">{this.props.isAirborne ? "Airborne" : "Grounded"}</div>
                    <img className={this.props.isAirborne ? 'airborne' : 'grounded'} alt="planeIcon" src={planeIcon} />
                </div>
                <div className="cutLabel">Cuts: <span className="cutCounter">{this.props.Cuts}</span></div>
                <div>
                    <button className="cutButton" onClick={() => this.props.ExecuteCut()}>CUT</button>
                    <button className="undoButton" onClick={() => this.props.UndoCut()}>Undo</button>
                </div>
            </div>
            </div>

        )
    }
}
export default Player;