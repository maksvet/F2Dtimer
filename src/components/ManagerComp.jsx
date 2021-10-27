import Timer from "./Timer";
import Player from "./playerComponents/Player";
import PenaltyTab from "./playerComponents/PenaltyTab";
import React from "react";
import startIcon from "../assets/startIcon.png";

class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Time: 0.00,
            TimerRuns: false,
            RoundLength: 240.00,
            TacticalLandingCountDown: 0,
            Player1: {
                Name: "Player1",
                Score: 0,
                isAirborne: false,
                HasAdvantage: false,
                TacticalLandingApproved: false,
                Border: "blue",
                Cuts: 0,
            },
            Player2: {
                Name: "Player2",
                Score: 0,
                isAirborne: false,
                HasAdvantage: false,
                TacticalLandingApproved: false,
                Border: "red",
                Cuts: 0,
            },
        }
    }
    render() {
        return (
            <div>
                <button className="startButton" onClick={() => this.startBattle()}>{this.state.TimerRuns ? "Stop" : "Start"}</button>
                <button className="resetButton" onClick={() => this.resetBattle()}>Reset</button>
                <Timer time={this.state.Time} />
                <div className="landingCountdown"> Landing Countdown: {this.state.TacticalLandingCountDown}s</div>
                <div className="Dashboard">
                    <Player {...this.state.Player1}
                        ExecuteCut={() => this.addCut(this.state.Player1)}
                        flipStatus={() => this.flipPlaneStatus(this.state.Player1)}
                        UndoCut={() => this.deductCut(this.state.Player1)}
                    />
                    <Player {...this.state.Player2}
                        ExecuteCut={() => this.addCut(this.state.Player2)}
                        flipStatus={() => this.flipPlaneStatus(this.state.Player2)}
                        UndoCut={() => this.deductCut(this.state.Player2)} />
                </div>
                <PenaltyTab player1={this.state.Player1} player2={this.state.Player2} deductPoints = {()=>this.deductPoints(this.state.Player1, 20)}/>
            </div>
        );
    }
    componentDidMount(prevState) {
        this.battleTimer = "";
        this.flyPointsTimer = "";
    }
    runTimer() {
        if (this.state.Time.toFixed(2) >= this.state.RoundLength) {
            return;
        }
        this.setState({ Time: this.state.Time + 0.01 });
        if (this.state.Time.toFixed(2) % 1 === 0) {
            this.addFlyingPoints();
        }

    }

    startTimer(prevState) {

        if (!this.state.TimerRuns && this.state.Time < this.state.RoundLength) {
            this.battleTimer = setInterval(() => this.runTimer(), 10);
            this.setState({ TimerRuns: true });
        }
        else {
            clearInterval(this.battleTimer);
            clearInterval(this.flyPointsTimer);
            this.setState({ TimerRuns: false });
        }
    }
    addCut(player) {
        this.addPoints(player, 50);
        player.Cuts += 1;
        this.setState({ [player.Name]: player });
    }
    deductCut(player) {
        this.deductPoints(player, 50);
        player.Cuts -= 1;
        this.setState({ [player.Name]: player });
    }
    addPoints(player, points) {
        player.Score += points
        this.setState({ [player.Name]: player });
        this.checkAdvantage();
    }
    deductPoints(player, points) {
        player.Score -= points
        this.setState({ [player.Name]: player });
        this.checkAdvantage();
    }
    addFlyingPoints() {
        if (this.state.Player1.isAirborne) {
            this.addPoints(this.state.Player1, 1);
        }
        if (this.state.Player2.isAirborne) {
            this.addPoints(this.state.Player2, 1);
        }
        this.checkAdvantage();
    }
    startBattle() {
        this.startTimer();
        this.flipPlaneStatus(this.state.Player1);
        this.flipPlaneStatus(this.state.Player2);
    }
    resetBattle() {
        this.setState(
            {
                Time: 0.00,
                TimerRuns: false,
                RoundLength: 240.00,
                TacticalLandingApproved: false,
                TacticalLandingCountDown: 0,
                Player1: {
                    Name: "Player1",
                    Score: 0,
                    isAirborne: false,
                    HasAdvantage: false,
                    TacticalLandingApproved: false,
                    Border: "blue",
                    Cuts: 0,
                },
                Player2: {
                    Name: "Player2",
                    Score: 0,
                    isAirborne: false,
                    HasAdvantage: false,
                    TacticalLandingApproved: false,
                    Border: "red",
                    Cuts: 0,
                },
            }
        )
        clearInterval(this.battleTimer);
        clearInterval(this.flyPointsTimer);
    }
    flipPlaneStatus(player) {
        let updPlayer = { ...player };
        updPlayer.isAirborne = !player.isAirborne;
        this.setState({ [player.Name]: updPlayer });
    }
    checkTacticalLanding(score1, score2) {
        if (score1 - score2 >= 6) {
            const res = score1 - score2 - 6 + Math.floor(this.state.Time);
            if (res >= this.state.RoundLength) {
                this.state.TacticalLandingCountDown = 0;
                return true;
            }
            else {
                this.state.TacticalLandingCountDown = this.state.RoundLength - res;
                return false;
            }
        }
        else{
            this.state.TacticalLandingCountDown = 0;
            return false;
        }
    }
    checkAdvantage() {
        let player1 = this.state.Player1;
        let player2 = this.state.Player2;
        if (player1.Score > player2.Score) {
            player1.HasAdvantage = true;
            player2.HasAdvantage = false;
            if (player1.Score - player2.Score >= 6) {
                console.log("Check for landing player 1");
                if (this.checkTacticalLanding(player1.Score, player2.Score)) {
                    console.log("Landing Approved");
                    player1.TacticalLandingApproved = true;
                }
                else {
                    player1.TacticalLandingApproved = false;
                }
            }
            this.setState({
                [player1.Name]: player1,
                [player2.Name]: player2
            })
        }
        else if (player1.Score < player2.Score) {
            player1.HasAdvantage = false;
            player2.HasAdvantage = true;
            this.setState({
                [player1.Name]: player1,
                [player2.Name]: player2
            })
            if (player1.Score - player2.Score <= 6) {
                if (this.checkTacticalLanding(player2.Score, player1.Score)) {
                    player2.TacticalLandingApproved = true;
                }
                else {
                    player2.TacticalLandingApproved = false;
                }
            }
            this.setState({
                [player1.Name]: player1,
                [player2.Name]: player2
            })
        }
        else {
            player1.HasAdvantage = false;
            player2.HasAdvantage = false;
            this.setState({
                [player1.Name]: player1,
                [player2.Name]: player2
            })
        }
    }

}
export default Manager;