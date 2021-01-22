import React, { Component } from 'react';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            country: ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { country } = this.state;
        return (
            <div class="column">
                <div class="card">
                    <h3>Please enter details</h3>
                    <input 
                        type="text" 
                        placeholder="Enter country name here"
                        value={country}
                        onChange={this.changeHandler}
                        name="country"
                    /><br /><br />
                    <button
                        disabled={country.length <= 0 ? true : false}
                        onClick={() => this.props.history.push({
                            pathname: '/details',
                            data: country
                        })}
                    >Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default Home;
