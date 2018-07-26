/* eslint-disable max-len */

require('script-loader!./jspsych.js');
require('script-loader!./jspsych-single-audio.js');
require('script-loader!./custom-image-drag-response.js');
require('script-loader!./jspsych-survey-text.js');
require('script-loader!./jspsych-ending.js');
require('script-loader!./jspsych-text.js');
require('script-loader!./jspsych-birth-question.js');

import React from 'react';
import { browserHistory } from 'react-router';
import localAxios from './localAxios';
import tempBaseUrl from '../../core/baseUrl';
const baseUrl = `${tempBaseUrl}/quizzes/sorting-task`;
import s from './sorting-task.css';

var shuffle = (a) => {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
};

var pickSeven = (array) => {
	var a = [];
	for (var i = 0; i < 7; i++) {
		a[i] = array[i];
	}
	return a;
};

//var jsPsych = jsPsych; // make eslint happy

class sortingTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
		browserHistory.listen(location => { // eslint-disable-line no-unused-vars
			jsPsych.endExperiment(); // eslint-disable-line no-undef
			window.location.reload(); // eslint-disable-line no-undef
		});
	}

	componentDidMount() {
		// load interact.js (used by jsPsych image drag plugin)
		const interactScript = document.createElement('script'); // eslint-disable-line no-undef
		interactScript.src = 'https://unpkg.com/interactjs@1.3.4/dist/interact.min.js';
		interactScript.onload = () => { console.log('interact.js loaded from CDN'); };
		document.head.appendChild(interactScript); // eslint-disable-line no-undef

		document.ontouchmove = function(event){ // eslint-disable-line no-undef
			event.preventDefault();
		};
		/* access to class in inline functions */
		const _this = this;
		const audio_files = [
			`${baseUrl}/audio/apple.wav`,
			`${baseUrl}/audio/airplane.wav`,
			`${baseUrl}/audio/ball.wav`,
			`${baseUrl}/audio/book.wav`,
			`${baseUrl}/audio/car.wav`,
			`${baseUrl}/audio/cat.wav`,
			`${baseUrl}/audio/chair.wav`,
			`${baseUrl}/audio/clock.wav`,
			`${baseUrl}/audio/cookie.wav`,
			`${baseUrl}/audio/dog.wav`,
			`${baseUrl}/audio/ear.wav`,
			`${baseUrl}/audio/eye.wav`,
			`${baseUrl}/audio/flower.wav`,
			`${baseUrl}/audio/hat.wav`,
			`${baseUrl}/audio/icecream.wav`,
			`${baseUrl}/audio/monkey.wav`,
			`${baseUrl}/audio/shoe.wav`,
			`${baseUrl}/audio/sun.wav`,
			`${baseUrl}/audio/telephone.wav`,
			`${baseUrl}/audio/toothbrush.wav`,
			`${baseUrl}/audio/mickey2.wav`,
			`${baseUrl}/audio/Mickey_GoodJob.wav`,
			`${baseUrl}/audio/trash.wav`
		];


		/* jspsych timeline */
		var mainTimeline = [];
		const dataArray = [];

		var demographicsAge = {
			type: 'birth-question',
			questions: [{prompt: 'Month of birth:'}],
			button_label: 'Continue',

		};

		var demographicsLang = {
			type: 'survey-text',
			questions: [{prompt: 'Native Language:'}],
			button_label: 'Continue'

		};
		var one = {
			type: 'single-audio',
			stimulus: `${baseUrl}/audio/pretest.wav`,
			response_ends_trial: false,
			timing_response: 10000,
			prompt: 'Give Mickey all of the triangles! Everything that\'s not a triangle, goes in the trash!'
		};
		const twoThreeFourFive = [1,2,3,4].map(n => ({
			type: 'image-drag-response',
			stimulus: `${baseUrl}/images/pre-test/pre-test_${n}.jpg`,
			choices: ['MICKEY', 'TRASH'],
			button_html: [`<button class="jspsych-btn"><img src=${`${baseUrl}/images/mickey.jpg`} style="width:13em;height:15em;"></button>`, `<button class="jspsych-btn"><img src=${baseUrl}/images/trash.jpg style="width:9em;height:15em;"></button>`],
			prompt: () => '<p>Give Mickey all of the triangles!</p>',
			margin_vertical: '0px',
			margin_horizontal: '75px',
			mickey_audio: `${baseUrl}/audio/mickey2.wav`,
			trash_audio: `${baseUrl}/audio/trash.wav`,
		}));

		var endPage = {
			type: 'ending',
			mickey_audio: `${baseUrl}/audio/Mickey_GoodJob.wav`,
			pages: [
				`Thanks for helping Mickey out! Good job!
				<img id= mickeyEnding src=${baseUrl}/images/mickey-mouse.jpg></img>`,
			],
		};

		var test = {

			timeline_variables: pickSeven(shuffle(
				[
					{label: 'apple', label2: 'apples', label3: 'an apple'},
					{label: 'airplane', label2: 'airplanes', label3: 'an airplane'},
					{label: 'ball', label2: 'balls', label3: 'a ball'},
					{label: 'book', label2: 'books', label3: 'a book'},
					{label: 'car', label2: 'cars', label3: 'a car'},
					{label: 'cat', label2: 'cats', label3: 'a cat'},
					{label: 'chair', label2: 'chairs', label3: 'a chair'},
					{label: 'clock', label2: 'clocks', label3: 'a clock'},
					{label: 'cookie', label2: 'cookies', label3: 'a cookie'},
					{label: 'dog', label2: 'dogs', label3: 'a dog'},
					{label: 'ear', label2: 'ears', label3: 'an ear'},
					{label: 'eye', label2: 'eyes', label3: 'an eye'},
					{label: 'flower', label2: 'flowers', label3: 'a flower'},
					{label: 'hat', label2: 'hats', label3: 'a hat'},
					{label: 'icecream', label2: 'ice cream', label3: 'ice cream'},
					{label: 'monkey', label2: 'monkeys', label3: 'a monkey'},
					{label: 'shoe', label2: 'shoes', label3: 'a shoe'},
					{label: 'sun', label2: 'suns', label3: 'a sun'},
					{label: 'telephone', label2: 'telephones', label3: 'a telephone'},
					{label: 'toothbrush', label2: 'toothbrushes', label3: 'a toothbrush'}
				]
			)),
			randomize_order: true,

			timeline: [
				{
					type: 'single-audio',
					stimulus: function(){
						var label = jsPsych.timelineVariable('label', true); // eslint-disable-line no-undef
						return `${baseUrl}/audio/${label}.wav`;
					},
					timing_response: 10000,
					response_ends_trial: false,
					prompt: function(){
						//var label = jsPsych.timelineVariable('label', true);
						var label2= jsPsych.timelineVariable('label2', true); // eslint-disable-line no-undef
						var label3= jsPsych.timelineVariable('label3', true); // eslint-disable-line no-undef
						return `Give Mickey all of the ${label2}! Everything that's not ${label3}, goes in the trash!`;
					},

				},
				{
					timeline_variables: [
						{picture_id: 1},
						{picture_id: 2},
						{picture_id: 3},
						{picture_id: 4},
						{picture_id: 5},
						{picture_id: 6},
						{picture_id: 7},
						{picture_id: 8},
						{picture_id: 9},
						{picture_id: 10}
					],
					randomize_order: true,
					timeline: [
						{	type: 'image-drag-response',
							stimulus: function(){
								var label = jsPsych.timelineVariable('label', true); // eslint-disable-line no-undef
								var picture_id = jsPsych.timelineVariable('picture_id', true); // eslint-disable-line no-undef
								return `${baseUrl}/images/${label}/${label}_${picture_id}.jpg`;
							},
							choices: ['MICKEY', 'TRASH'],
							button_html: [`<button class="jspsych-btn"><img src=${baseUrl}/images/mickey.jpg style="width:13em;height:15em;"></button>`, `<button class="jspsych-btn"><img src=${baseUrl}/images/trash.jpg style="width:9em;height:15em;"></button>`],
							prompt: function(){
								return '<p>Give Mickey all of the '+ jsPsych.timelineVariable('label2', true)+'! </p>'; // eslint-disable-line no-undef
							},
							margin_vertical: '0px',
							margin_horizontal: '75px',
							mickey_audio: `${baseUrl}/audio/mickey2.wav`,
							trash_audio: `${baseUrl}/audio/trash.wav`
						}
					]
				}
			]
		};

		localAxios
			.post('/createUser')
			.then( res => {
				_this.setState({ loading: false, user_id: res.data.apiResData });
			})
			.then(() => {
				mainTimeline.push(demographicsAge);
				mainTimeline.push(demographicsLang);
				mainTimeline.push(one);
				mainTimeline.concat(twoThreeFourFive);
				mainTimeline.push(test);
				mainTimeline.push(endPage);
			})
			.then(() => {
				jsPsych.init({ // eslint-disable-line no-undef
					display_element: this.refs.jsPsychTarget,
					timeline: mainTimeline,
					preload_audio: audio_files,
					on_data_update: function(data) {
						dataArray.push(data);
						let dataString = 'error';
						try {
							dataString = JSON.stringify(data);
						} catch (e) { console.log(e); }
						localAxios
							.post('/response', {
								user_id: _this.state.user_id,
								data_string: dataString
							});
					}
				});
			})
			.catch(console.log);
	}
	render() {
		return (
			<div style={{
				position: 'fixed',
				overflow: 'hidden',
				width: '100vw',
				height: '100vh'
			}}>
				<audio id="mickey"></audio>
				<audio id="trash"></audio>
				<div id="jsPsychContainer" >
					<div style={{ display: this.state.loading ? '' : 'none' }}>
						<p className={s.loading}>
							<b>Loading...</b>
						</p>
					</div>
					<div ref="jsPsychTarget" id="jsPsychTarget" />
				</div>
				{/* these are completely useless, but some of the jsPsych dependencies
						keep assuming they exist and try to change their styling...
				*/}
				<div id='header'></div>
				<div id='footer'></div>
			</div>
		);
	}

}
export default sortingTask;
