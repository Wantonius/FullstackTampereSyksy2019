import React,{useEffect,useState} from 'react';

const EffectHook = () => {

	const [isOn, setIsOn] = useState(false);
	const [timer, setTimer] = useState(0);
	
	useEffect(
		() => {
			let interval;
			if(isOn) {
				interval = setInterval(
					() => setTimer(timer => timer +1),1000);
			}
			return () => clearInterval(interval);					
		}
	,[isOn]);
	
	const reset = () => {
		setIsOn(false);
		setTimer(0);
	}
	
	let ui = <button onClick={() => setIsOn(true)}>Start</button>
	if(isOn) {
		ui = <button onClick={() => setIsOn(false)}>Stop</button>		
	}
	return (
		<div>
			<p>Timer: {timer}</p>
				{ui}
			<button onClick={() => reset()}>Reset</button>
		</div>
	)
}

export default EffectHook;