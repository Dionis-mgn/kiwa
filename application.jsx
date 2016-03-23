import React from 'react';

import Timer from 'timer.jsx';

class Application extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			free: false,
			serverWork: true,
			error: null,
			letsgoTimer: 0,
			letsgoTimerEnd: 0,
			letsgoTimeout: 0,
			letsgoMessage: null
		};

		this.update = this.update.bind(this);
		this.letsgo = this.letsgo.bind(this);

		this.update(true);
	}

	update(silent) {
		if (!silent) {
			this.setState({
				serverWork: true
			});
		}

		$.ajax({
			type: 'GET',
			url: '/status.php',
			dataType: 'json',
			contentType: 'application/json',
			success: (response) => {
				let free = !response.light;
				const letsgoTimer = response.currentTimestamp - response.letsgoTimestamp;
				const letsgoTimerEnd = response.letsgoTimeout * 2;
				let letsgoMessage = null;

				if (free && letsgoTimer < letsgoTimerEnd) {
					letsgoMessage = 'Кто-то уже выдвинулся в кикерешную';
					free = false;
				}

				this.setState({
					free,
					letsgoTimeout: response.letsgoTimeout,
					letsgoTimer,
					letsgoTimerEnd,
					letsgoMessage,
					serverWork: false,
					error: null
				});
			},
			error: () => {
				this.setState({
					free: false,
					serverWork: false,
					error: 'Я сломался =('
				});
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
			success: (response) => {
				this.setState({
					free: !response.light,
					serverWork: false,
					letsgoTimer: this.state.letsgoTimeout,
					letsgoTimerEnd: 0,
					letsgoMessage: 'Жду тебя!',
					error: null
				});
			},
			error: () => {
				this.setState({
					free: false,
					serverWork: false,
					error: 'Что-то пошло не так. Видимо, кикерешную уже успели занять.'
				});
			}
		});
	}

	getError() {
		return (
			<div className="infopanel">
				<h1>Упс!</h1>
				<p>{this.state.error}</p>
				<button type="button" className="mybutton" onClick={() => { this.update(false); }}>Обновить</button>
			</div>
		);
	}

	getUsualContent() {
		let statusValue = 'во власти Шредингера';
		let letsgoButton = null;
		if (!this.state.serverWork) {
			statusValue = this.state.free ? 'свободна' : 'занята';
			if (this.state.free) letsgoButton = <button type="button" className="mybutton" onClick={this.letsgo}>Я уже иду!</button>;
		}

		return (
			<div className="infopanel">
				<h1>Привет!</h1>
				<p>Меня зовут Тимофей и я — смотритель кикерешной.</p>
				<p className="status-string">Кикерешная сейчас <span className="status-value">{statusValue}</span></p>
				{letsgoButton}
				<button type="button" className="mybutton" onClick={() => { this.update(false); }}>Обновить</button>
			</div>
		);
	}

	getLetsGoContent() {
		return (
			<div className="infopanel">
				<h1>Привет!</h1>
				<p>Меня зовут Тимофей и я — смотритель кикерешной.</p>
				<p className="status-string">{this.state.letsgoMessage} <span className="status-value">
					<Timer start={this.state.letsgoTimer} end={this.state.letsgoTimerEnd} endCallback={() => { this.update(true); } } />
				</span></p>
				<button type="button" className="mybutton" onClick={() => { this.update(false); }}>Обновить</button>
			</div>
		);
	}

	getContent() {
		if (this.state.letsgoMessage !== null) {
			return this.getLetsGoContent();
		}

		return this.getUsualContent();
	}

	render() {
		let content = null;
		if (this.state.error !== null) {
			content = this.getError();
		} else {
			content = this.getContent();
		}

		let className = 'awaiting';
		if (!this.state.serverWork) {
			className = this.state.free ? 'free' : 'busy';
		}
		className += ' status';

		return (
			<div className={className}>
				<div className="datapanel">
					{content}
				</div>
			</div>
		);
	}
}

export default Application;
