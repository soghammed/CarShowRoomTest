import React, { Component } from 'react';
// import { data } from '../data';

class Cars extends Component {

	constructor(props){
		super(props);
		// console.log('cpnstructing', this.props.from - this.props.total);
		// console.log(this.props.cars);
	}

	componentWillMount(){
		console.log('mounted');
		//1* 10 - carsPerPage.
	}

	carList = () => { 
		if(this.props.viewMode === "grid"){
			return this.props.cars.map( car => {
				return this.renderGridItem(car.Vehicle_ID, car);
			});
		}else if(this.props.viewMode === "list"){
			return this.props.cars.map( car => {
				return this.renderListItem(car.Vehicle_ID, car);
			});
		}
	}

	renderListItem = (key, car) => {
		return (
			<div key={key} className="card col-lg-6 offset-lg-3" style={{border:"1px solid black",flexDirection:"row",marginTop:"10px",padding:"10px"}}>
				<img className="img" style={{borderRadius:"50%",width:"200px",height:"200px",float:'left'}} src={car.PictureRefs ? car.PictureRefs.split(',')[0] : ""} alt="Vehicle Image"/>
				<div className="listCardDetails" style={{display:"inline-block", margin:"20px"}}>
					<div>Registration: {car.Registration}</div>
					<div>Registration Date: {car.RegistrationDate}</div>
					<div>Transmission Date: {car.TransmissionType}</div>
					<div>Fuel: {car.FuelType}</div>
					<div>No. of doors: {car.NoDoors}</div>
					<div>Milage: {car.Mileage}</div>
				</div>
			</div>
		);
	}
	renderGridItem = (key, car) => {
		// console.log(car);
		return (
			<div key={key} className="col-sm-12 col-md-4 col-lg-4 Cars">
				<div className="card">
					<div className="card-header">
						<img className="img" src={car.PictureRefs ? car.PictureRefs.split(',')[0] : ""} alt="Vehicle Image"/>
						<div>{car.Make}</div>
						<div style={{fontSize:"0.7em",marginBottom:"10px"}}>{car.Model}</div>
						<div>£ {car.Price}</div>
					</div>
					<div className="card-body">
						<div style={{fontSize:"11px"}}>
							<div>Registration: <span style={{float:"right"}}>{car.Registration}</span></div>
							<hr/>
							<div>Registration Date: <span style={{float:"right"}}>{car.RegistrationDate}</span></div>
							<hr/>
							<div>Transmission Date: <span style={{float:"right"}}>{car.TransmissionType}</span></div>
							<hr/>
							<div>Fuel: <span style={{float:"right"}}>{car.FuelType}</span></div>
							<hr/>
							<div>No. of doors: <span style={{float:"right"}}>{car.NoDoors}</span></div>
							<hr/>
							<div>Milage: <span style={{float:"right"}}>{car.Mileage}</span></div>
						</div>
						<br/>
						<div><button style={{width:"100%"}} className="btn btn-navy">FULL DETAILS</button></div>
					</div>
				</div>
			</div>
		);
	}

	render(){
		console.log('rendered', this.state);
		const carsList = this.carList();
		return(
			<div className="col-10 offset-1">
				<div className="row">

					{carsList}
				</div>
			</div>
		);
	}

}

export default Cars;
