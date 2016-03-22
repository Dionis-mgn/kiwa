import React from 'react';

class Application extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			free: false,
			serverWork: true
		};

		this.update = this.update.bind(this);
		this.letsgo = this.letsgo.bind(this);

		this.update();
	}

	update() {
		this.setState({
			serverWork: true
		});

		$.ajax({
			type: 'GET',
			url: '/status.php',
			dataType: 'json',
			contentType: 'application/json',
			success: (response) => {
				this.setState({
					free: !response.light,
					serverWork: false
				});
			},
			error: () => {

			}
		});
	}

	letsgo() {
		this.setState({
			serverWork: true
		});

		$.ajax({
			type: 'GET',
			url: '/letsgo.php',
			dataType: 'json',
			contentType: 'application/json',
			success: (response) => {
				this.setState({
					free: !response.light,
					serverWork: false
				});
			},
			error: () => {

			}
		});
	}

	render() {

		let className = "awaiting";
		let statusValue = "во власти Шредингера";
		let letsgoButton = null;
		if (!this.state.serverWork) {
			className = this.state.free ? "free" : "busy";
			statusValue = this.state.free ? "свободна" : "занята";
			// if (this.state.free) letsgoButton = <button type="button" className="mybutton" onClick={this.letsgo}>Я уже иду!</button>;
		}
		className += " status";

		return (
			<div className={className}>
				<div className="datapanel">
					<div className="infopanel">
						<h1>Привет!</h1>
						<p>Меня зовут Тимофей и я — смотритель кикерешной.</p>
						<p className="status-string">Кикерешная сейчас <span className="status-value">{statusValue}</span></p>
						{letsgoButton}
						<button type="button" className="mybutton" onClick={this.update}>Обновить</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Application;
