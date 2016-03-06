import React from 'react';

class Application extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			free: false,
			serverWork: true
		};

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

	render() {

		let className = "awaiting";
		let statusValue = "во власти Шредингера";
		if (!this.state.serverWork) {
			className = this.state.free ? "free" : "busy";
			statusValue = this.state.free ? "свободна" : "занята";
		}
		className += " status";

		return (
			<div className={className}>
				<p>Привет! Меня зовут Тимофей и я — смотритель кикерешной.</p>
				<p>Кикерешная сейчас <span className="status-value">{statusValue}</span></p>
			</div>
		);
	}
}

export default Application;
