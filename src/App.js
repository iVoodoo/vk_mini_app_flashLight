import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {number} from "prop-types";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lightOn: false, isUsed : false};

        this.seon = this.seon.bind(this);
        this.turnOnLight = this.turnOnLight.bind(this);
    }

    numbers = {"0": false, "1": false, "2": false, "3": false, "4": false, "5": false, "6": false, "7": false}



    seon(id) {
        if (!this.state.lightOn) {
            this.setState();
            this.numbers[id] = !this.numbers[id];
        }
        return this.state.lightOn
    }

    turnOnLight() {
        alert(this.state.isUsed)
        this.setState(prevState => ({
            lightOn: !prevState.lightOn,
            isUsed: !prevState.isUsed}));
        setTimeout(() => {
            alert(this.state.isUsed)
            let i=0
                setInterval(()=>{
                    if (this.state.isUsed){
                        if (this.numbers[i.toString()]) {

                            bridge.send("VKWebAppFlashSetLevel", {"level": 1});
                        } else {
                            bridge.send("VKWebAppFlashSetLevel", {"level": 0});
                        }
                        i = (i+1) % 8;
                    }
                },1000)
        }, 1000);

    }

    render() {
        return (
            <div>
                {/*<NumberList numbers={this.numbers} setLightOn={this.setLightOn}/>*/}
                <Button setlighton={this.seon} turnon={this.numbers["0"]}
                        id={"0"}>{this.numbers["0"] ? "on" : "off"}</Button>
                <Button setlighton={this.seon} turnon={this.numbers["1"]}
                        id={"1"}>{this.numbers["1"] ? "on" : "off"}</Button>
                <Button setlighton={this.seon} turnon={this.numbers["2"]}
                        id={"2"}>{this.numbers["2"] ? "on" : "off"}</Button>
                <Button setlighton={this.seon} turnon={this.numbers["3"]}
                        id={"3"}>{this.numbers["3"] ? "on" : "off"}</Button>
                <Button setlighton={this.seon} turnon={this.numbers["4"]}
                        id={"4"}>{this.numbers["4"] ? "on" : "off"}</Button>
                <Button setlighton={this.seon} turnon={this.numbers["5"]}
                        id={"5"}>{this.numbers["5"] ? "on" : "off"}</Button>
                <Button setlighton={this.seon} turnon={this.numbers["6"]}
                        id={"6"}>{this.numbers["6"] ? "on" : "off"}</Button>
                <Button setlighton={this.seon} turnon={this.numbers["7"]}
                        id={"7"}>{this.numbers["7"] ? "on" : "off"}</Button>


                <button onClick={this.turnOnLight}>
                    {this.state.lightOn ? "on" : "off"}
                </button>
            </div>
        );
    }
}

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {turnon: props.turnon};
        this.setlhton = this.setlhton.bind(this);
    }

    setlhton() {
        if(!this.props.setlighton(this.props.id))
            this.setState(prevState => ({
                turnon: !prevState.turnon
            }));
    }

    render() {
        return (
            <button onClick={this.setlhton}>
                {this.state.turnon ? "on" : "off"}
            </button>
        );
    }
}


export default App;
