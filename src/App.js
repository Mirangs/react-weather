import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = `8e912225a4f1b77a42e0ea8fe33c631e`;

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: ""
  }

  getWeather = async (evt) => {
    evt.preventDefault();
    const city = evt.target.elements.city.value;
    const country = evt.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      const data = await api_call.json();
      this.setState({ 
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value."
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles />
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                <Weather 
                  temperature={this.state.temperature} 
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


        

export default App;