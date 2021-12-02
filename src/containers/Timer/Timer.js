import React, { Component, Fragment } from "react";
import MainButton from "../../components/Buttons/MainButton";
import Label from "../../components/Labels/Label";

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { time: { h: 0, m: 0, s: 0 }, seconds: 0, laps: [] };

        this.timer = 0;

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.lapTimer = this.lapTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.incTimer = this.incTimer.bind(this);
        this.decTimer = this.decTimer.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            h: hours,
            m: minutes,
            s: seconds,
        };
        return obj;
    }

    incTimer() {
        if (this.state.seconds >= 0)
            this.setState((prevState) => ({
                seconds: prevState.seconds + 60,
                time: this.secondsToTime(prevState.seconds + 60),
            }));
    }

    decTimer() {
        if (this.state.seconds > 61 || this.timer === 0)
            this.setState((prevState) => ({
                seconds: prevState.seconds - 60,
                time: this.secondsToTime(prevState.seconds - 60),
            }));
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Removing a sec and setting state to re-render
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero
        if (seconds === 0) {
            clearInterval(this.timer);
            this.setState({
                time: { h: 0, m: 0, s: 0 },
                seconds: 0,
            });
        }
    }

    stopTimer() {
        if (this.timer !== 0 && this.state.seconds !== 0) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    lapTimer() {
        if (this.timer !== 0 && this.state.seconds !== 0) {
            const newLaps = [...this.state.laps];

            this.setState((prevState) => {
                return {
                    laps: newLaps.concat(prevState.time),
                };
            });
        }
    }

    removeLap(id) {
        const laps = this.state.laps;
        this.setState({ laps: laps.filter((item, index) => index !== id) });
    }

    resetTimer() {
        this.setState({
            time: { h: 0, m: 0, s: 0 },
            seconds: 0,
            laps: [],
        });

        if (this.timer !== 0) {
            clearInterval(this.timer);
        }
    }

    timeFormatter(time) {
        let { h, m, s } = time;

        if (h.toString().length < 2) h = `0${h}`;

        if (m.toString().length < 2) m = `0${m}`;

        if (s.toString().length < 2) s = `0${s}`;

        return { h, m, s };
    }

    render() {
        let { h, m, s } = this.timeFormatter(this.state.time);
        let laps = null;

        if (this.state.laps.length !== 0)
            laps = this.state.laps.map((lap, id) => {
                let { h, m, s } = this.timeFormatter(lap);
                return <Label clicked={() => this.removeLap(id)} key={id} lapTime={`${h}:${m}:${s}`} />;
            });

        return (
            <Fragment>
                <div className="container mt-4 d-flex flex-column">
                    <div className="mx-auto">
                        <span className="h2 ">
                            {h}:{m}:{s}
                        </span>
                    </div>
                    <div className="mx-5 px-auto d-flex flex-row justify-content-between align-content-between">
                        <MainButton clicked={this.incTimer}>+</MainButton>
                        <MainButton clicked={this.startTimer}>Start</MainButton>
                        <MainButton clicked={this.stopTimer}>Stop</MainButton>
                        <MainButton clicked={this.lapTimer}>Lap</MainButton>
                        <MainButton clicked={this.resetTimer}>Reset</MainButton>
                        <MainButton clicked={this.decTimer}>-</MainButton>
                    </div>
                </div>
                <div className="container d-flex flex-column justify-content-center align-items-center mx-auto text-center h3 ">{laps}</div>
            </Fragment>
        );
    }
}

export default Timer;
