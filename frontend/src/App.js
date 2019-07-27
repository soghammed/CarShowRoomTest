import React, { Component } from 'react';
// import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faThList } from '@fortawesome/free-solid-svg-icons'
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
import Cars from './Cars/Cars';
import { data } from './data';
// import $ from 'jquery';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      defaultCars:data,
      cars: data,
      form:{
        make: "any",
        model: "any",
        minPrice: 0,
        maxPrice: 0
      },
      viewMode: "grid",
      currentPage: 1,
      carsPerPage: 10
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentWillMount(){

  }

  handleClick(event){
    console.log(event.target.id);
    this.setState({
      currentPage: Number(event.target.id)
    }, () => console.log(this.state));
  }

  searchByData = () => { 
    return {
      make: this.state.defaultCars.map(car => car.Make),
      model: this.state.defaultCars.map(car => car.Model),
      minPrice: [],
      maxPrice: []
    };
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    let cars = this.state.defaultCars.filter((a) => {
      console.log(a.Make, typeof this.state.form.make, a.Make === this.state.form.make || a.Make === "any");
      console.log(a.Model, typeof this.state.form.model, a.Model === "any" || a.Model === this.state.form.model);
      // console.log(a.Price, parseInt(this.state.form.minPrice), parseInt(this.state.form.maxPrice), a.Price > parseInt(this.state.form.minPrice), (parseInt(this.state.form.maxPrice) === 0 ||a.Price <= parseInt(this.state.form.maxPrice)));
      return (a.Make === this.state.form.make || this.state.form.make === "any") && (this.state.form.model === "any" || a.Model == this.state.form.model) && a.Price >= parseInt(this.state.form.minPrice) && (parseInt(this.state.form.maxPrice) === 0 || a.Price <= parseInt(this.state.form.maxPrice))
    });
    this.setState({cars: cars});
  }

  updateState = (key, e) => {
    this.setState( prevState => {
      return {
        ...prevState,
        form:{
          ...prevState.form,
          [key]: e
        }
      }
    }, () => console.log('after update', this.state.form));
  }

  sortCars = (sortBy) => {
    let cars = this.state.cars;
    switch(sortBy){
      case 'Make':
        cars = this.state.cars.sort((a,b) => {
          return a[sortBy] > b [sortBy] ? 1 : -1;
        });
        break;

      case 'Model':
        cars = this.state.cars.sort((a,b) => {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        });
        break;
      case 'Price':
        cars = this.state.cars.sort((a,b) => {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        });
        break;
    }
    this.setState(prevState => {
      return {
        ...prevState,
        cars: cars
      }
    }, () => console.log('carsSortedBy'+sortBy, this.state.cars));
  }

  viewModeHandle = (viewMode) => {
    this.setState({viewMode: viewMode}, () => console.log(this.state));
  }

  nextPage = () => {
    this.setState( prevState => {
      return {
        ...prevState,
        currentPage: parseInt(prevState.currentPage) + 1
      }
    });
  }

  render(){
    const { currentPage, carsPerPage } = this.state;
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const formData = this.searchByData(); 
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(this.state.cars.length / carsPerPage); i++){
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
    console.log(currentPage, number);
      return (
        <li key={number} className="page-item">
          <a 
            className="page-link"
            key={number} 
            href="#"
            onClick={this.handleClick}
            id={number}>
            {number}
          </a>
          <div className={number === currentPage ? "pageNumActive" : ""}>
          </div>
        </li>
      );
    });
    const settingsRow2 = (
      <div style={{marginTop:"15px"}}>
        <div className="ViewButtonsContainer" style={{textAlign:"right"}}>
          <div className="GridViewButton">
            <div className="inline-button" style={{color:this.state.viewMode === 'grid' ? 'grey' : 'lightgrey'}} onClick={() => this.viewModeHandle('grid')}>
                <FontAwesomeIcon size="lg" icon={faTh}/> <span style={{color:'grey'}}>Grid View</span>
            </div>
            &nbsp;&nbsp;
            <div className="inline-button" style={{color:this.state.viewMode === 'list' ? 'grey' : 'lightgrey'}} onClick={() => this.viewModeHandle('list')}>
              <FontAwesomeIcon size="lg" icon={faThList}/> <span style={{color:'grey'}}>List View</span>
            </div>
          </div>
          <div className="ListViewButton">
          </div>
        </div>
        <div className="dropdown">
          <button 
            className="btn btn-secondary dropdown-toggle sortByButton" 
            type="button" 
            id="dropdownMenu2" 
            data-toggle="dropdown" 
            aria-haspopup="true" 
            aria-expanded="false"
            style={{
              borderColor:"lightgrey",
              borderRadius:0,
              fontSize:"11px"
            }}>
            SORT BY
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" onClick={() => this.sortCars('Make')} type="button">Make</button>
            <button className="dropdown-item" onClick={() => this.sortCars('Model')} type="button">Model</button>
            <button className="dropdown-item" onClick={() => this.sortCars('Price')} type="button">Price</button>
          </div>
        </div>
      </div>
    );
    let cars = this.state.cars.slice((indexOfLastCar - carsPerPage), indexOfLastCar);
    return(
      <div className="App">
        <div className="banner">Name
          <h5 className="hTitle">THE SHOWROOM</h5>
          <div className="hTitleBBorder"></div>
          <div className="searchbybox">
            <form onSubmit={this.formSubmitHandler}>
              <div className="row col-sm-10 offset-sm-1">     
                  <div className="col-sm-2 offset-sm-1 col-md-2 offset-md-1">
                    <select className="form-control" name="make" id="make" value={this.state.form.make} onChange={(e) => this.updateState('make', e.target.value)}>
                    <option value="any">Make (any)</option>
                    {
                      formData.make.map((make, ind) => (
                        <option key={ind} value={make}>{make}</option>
                      ))
                    }
                    </select>
                  </div>
                  <div className="col-sm-2 col-md-2">
                    <select className="form-control" name="model" id="model" value={this.state.form.model} onChange={(e) => this.updateState('model', e.target.value)}>
                    <option value="any">Model (any)</option>
                    {
                      formData.model.map((model, ind) => (
                        <option key={ind} value={model}>{model}</option>
                      ))
                    }
                    </select>
                  </div>
                  <div className="col-sm-2 col-md-2">
                      <input className="form-control" type="number" name="minPrice" id="minPrice" placeholder="Min Price (Any)" value={this.state.form.minPrice} onChange={(e) => this.updateState('minPrice', e.target.value)}/>
                  </div>
                  <div className="col-sm-2 col-md-2">
                      <input className="form-control" type="number" name="maxPrice" id="maxPrice" placeholder="Max Price (Any)" value={this.state.form.maxPrice} onChange={(e) => this.updateState('maxPrice', e.target.value)}/>
                  </div>
                  <div className="col-sm-2 col-md-2">
                    <button onClick={this.searchByHandler} className="btn btn-navy ellipsis">VIEW STOCK</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="settings">
          <div className="col-6 offset-3 center">
            <div className="settingsRow1">
              <span style={{fontSize:"1.5em",fontWeight:"bold"}}>
                {this.state.cars.length}&nbsp;
              </span>
              <span style={{fontSize:"1.2em"}}>
                  cars matching your criteria.
              </span>
            </div>
          </div>
          <div className="col-10 offset-1 settingsRow2">
            {settingsRow2}
          </div>
        </div>
        <Cars cars={cars} searchBy={this.state.form} viewMode={this.state.viewMode}/>
        <div style={{backgroundColor:"white", marginTop:"10px",padding:"15px 50px 15px 0px", height:"100px"}}>
          <ul className="pagination">
            {renderPageNumbers} {pageNumbers.length > 1 ? (<span class="rightArrow" onClick={this.nextPage}>&#x2771;</span>) : ""}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
