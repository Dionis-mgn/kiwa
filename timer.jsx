import React from 'react';

class Timer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			current: props.start
		};
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			const newValue = this.state.current + Math.sign(this.props.end - this.props.start);
			if (newValue === this.props.end && this.props.endCallback) {
				this.props.endCallback();
				clearInterval(this.timer);
			}

			this.setState({
				current: newValue
			});
		}, 1000);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			current: nextProps.start
		});
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		const minutes = Math.trunc(this.state.current / 60);
		const seconds = this.state.current % 60;
		let value = minutes + ':';
		if (seconds < 10) value += '0';
		value += seconds;

		return (
			<span className="timer">{value}</span>
		);
	}
}

Timer.propTypes = {
	start: React.PropTypes.number,
	end: React.PropTypes.number,
	endCallback: React.PropTypes.func
};

Timer.defaultProps = {
	start: 60,
	end: 0,
	endCallback: () => {}
};

export default Timer;
