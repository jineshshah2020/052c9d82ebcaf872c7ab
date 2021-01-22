import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Details extends Component {
    constructor(props){
        super(props);
        this.state = {
            details: [],
            weatherDetails: null,
            city: ""
        }
    }

    componentDidMount = () => {
        if(this.props.location.data){
            const url = `https://restcountries.eu/rest/v2/name/${this.props.location.data}`
            axios.get(url)
            .then(res => {
                const data = res.data;
                let tempData = [];
                for(let i = 0; i < data.length; i++){
                    tempData.push(data[i])
                }
                this.setState({
                    details: tempData
                })
            })
        }
    }

    getCapitalWeather = (event) => {
        const url = `http://api.weatherstack.com/current?access_key=2ef64c2429bf0e891958d7a2cedf3a89&query=${this.state.details[event.target.id].capital}`;
        axios.get(url)
        .then(res => {
            console.log(res.data)
            this.setState({
                weatherDetails: res.data.current,
                city: res.data.location.name
            })
        })
    }

    render() {
        const { details, weatherDetails, city } = this.state;
        return (
            <div>
                {this.props.location.data ? (
                    <Fragment>
                    {details && details.map((detail, index) => {
                        return (
                        <div class="column">
                            <div class="card">
                                <h1>Country Details</h1>
                                <p>Capital : {detail.capital}</p>
                                <p>Population : {detail.population}</p>
                                <p>Latlng : 
                                    {detail.latlng.map((lat) => {
                                         return (
                                            <span>{lat},</span>
                                         )
                                        }
                                    )}
                                </p>
                                <img
                                    src={detail.flag}
                                    alt="country flag image"
                                /><br />
                                {weatherDetails && city && city == detail.capital ? (
                                    <Fragment>
                                        <br />
                                        <h3>Weather Details</h3>
                                        <p>Temprature : {weatherDetails.temperature}</p>
                                        {weatherDetails.weather_icons.map((image) => {
                                            return (
                                            <Fragment>
                                                <img
                                                    src={image}
                                                /><br />
                                            </Fragment>
                                            )
                                        }
                                        )}
                                        <p>Wind Speed : {weatherDetails.wind_speed}</p>
                                        <p>Precip : {weatherDetails.precip}</p>
                                    </Fragment>
                                )
                                :
                                (
                                    <button
                                        id={index}
                                        onClick={this.getCapitalWeather}
                                    >
                                        Capital Weather
                                    </button>
                                )}
                            </div>
                        </div>
                        )
                    })}
                    </Fragment>
                )
                :
                (
                    <div class="column">
                        <div class="card">
                            Page not found
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Details;
