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
import baseUrl from '../../core/baseUrl';
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

class sortingTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
		browserHistory.listen(location => { // eslint-disable-line no-unused-vars
			jsPsych.endExperiment();
			window.location.reload(); // eslint-disable-line no-undef
		});
	}

	/* Added get trials here */
	//!!!!!!! not used anywhere in this file... !!!!!!!!!!!!
	/*
	getTrials() {
		let arr = [];
		let label = '';
		let a_trial = {};
		let intermediate = {};
		let imgs_shuffled = [];
		let tag = 0;

		let stims_shuf = jsPsych.randomization.shuffle([
			'monkey',
			'flower',
			//  'sun',
			'clock',
			'hat',
			//'airplane',
			//  'dog',
			//  'car',
			'ball',
			//'cat',
			//  'ice cream',
			'cookie',
			'eye',
			'apple',
			//  'book',
			'ear',
			'chair',
			'telephone',
			// 'toothbrush',
			// 'monkey',
			//  'shoe'

		]);
		let img_tags = [1,2,3,4,5,6,7,8,9,10];



		for (let i in stims_shuf) {

			label = stims_shuf[i];
			imgs_shuffled = jsPsych.randomization.shuffle(img_tags);

			intermediate = {
				type: 'single-audio',
				stimulus: `${baseUrl}/quizzes/sorting-task/audio/${label}.wav`,
				timing_response: 5000,
				response_ends_trial: false,
				prompt: `Mickey wants all of the ${label}'s!`
			},



				arr.push(intermediate);

			for (let j in imgs_shuffled) {

				tag = imgs_shuffled[j];

				a_trial = {
					type: 'image-drag-response',
					stimulus: `${baseUrl}/quizzes/sorting-task/images/test_trials/${label}/${label}_${tag}.jpg`,
					choices: ['MICKEY', 'TRASH'],
					button_html: [`<button id = "dragButton0" class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/mickey.jpg style="width:6em;height:6em;"></button>`, `<button id = "dragButton1" class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/trash.jpg style="width:6em;height:6em;"></button>`],
					prompt: `<p>Give Mickey all of the ${label}'s! </p>`,
					margin_vertical: '0px',
					margin_horizontal: '75px',
					mickey_audio: `${baseUrl}/quizzes/sorting-task/audio/mickey2.wav`,
					trash_audio: `${baseUrl}/quizzes/sorting-task/audio/trash.wav`
				};
				arr.push(a_trial);
			}


		}
		return arr;
	}
	*/


	componentDidMount() {
		// load interact.js (used by jsPsych image drag plugin)
		const interactScript = document.createElement('script');
		interactScript.src = 'https://unpkg.com/interactjs@1.3.4/dist/interact.min.js';
		interactScript.onload = () => { console.log('interact.js loaded from CDN'); };
		document.head.appendChild(interactScript);

		document.ontouchmove = function(event){ // eslint-disable-line no-undef
			event.preventDefault();
		};
		/* access to class in inline functions */
		const _this = this;

		var audio_files = [
			`${baseUrl}/quizzes/sorting-task/audio/apple.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/ball.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/chair.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/clock.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/cookie.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/ear.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/eye.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/flower.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/hat.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/monkey.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/telephone.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/mickey2.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/trash.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/Mickey_GoodJob.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/airplane.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/apple.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/book.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/car.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/cat.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/dog.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/icecream.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/monkey.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/pretest.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/shoe.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/sun.wav`,
			`${baseUrl}/quizzes/sorting-task/audio/toothbrush.wav`
		];


		/* jspsych timeline */
		var mainTimeline = [];
		const dataArray = [];
		let user;

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
			stimulus: `${baseUrl}/quizzes/sorting-task/audio/pretest.wav`,
			response_ends_trial: false,
			timing_response: 10000,
			prompt: 'Give Mickey all of the triangles! Everything that\'s not a triangle, goes in the trash!'
		};

		var two = {
			type: 'image-drag-response',
			stimulus: function(){
				return `${baseUrl}/quizzes/sorting-task/images/pre-test/pre-test_1.jpg`;
			},
			choices: ['MICKEY', 'TRASH'],
			button_html: [`<button class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/mickey.jpg style="width:13em;height:15em;"></button>`, `<button class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/trash.jpg style="width:9em;height:15em;"></button>`],
			prompt: function(){
				return '<p>Give Mickey all of the triangles!</p>';
			},
			margin_vertical: '0px',
			margin_horizontal: '75px',
			mickey_audio: `${baseUrl}/quizzes/sorting-task/audio/mickey2.wav`,
			trash_audio: `${baseUrl}/quizzes/sorting-task/audio/trash.wav`
		};

		var three = {
			type: 'image-drag-response',
			stimulus: function(){
				return `${baseUrl}/quizzes/sorting-task/images/pre-test/pre-test_2.jpg`;
			},
			choices: ['MICKEY', 'TRASH'],
			button_html: [`<button class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/mickey.jpg style="width:13em;height:15em;"></button>`, `<button class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/trash.jpg style="width:9em;height:15em;"></button>`],
			prompt: function(){
				return '<p>Give Mickey all of the triangles!</p>';
			},
			margin_vertical: '0px',
			margin_horizontal: '75px',
			mickey_audio: `${baseUrl}/quizzes/sorting-task/audio/mickey2.wav`,
			trash_audio: `${baseUrl}/quizzes/sorting-task/audio/trash.wav`
		};


		var four = {
			type: 'image-drag-response',
			stimulus: function(){
				return `${baseUrl}/quizzes/sorting-task/images/pre-test/pre-test_3.jpg`;
			},
			choices: ['MICKEY', 'TRASH'],
			button_html: [`<button class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/mickey.jpg style="width:13em;height:15em;"></button>`, `<button class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/trash.jpg style="width:9em;height:15em;"></button>`],
			prompt: function(){
				return '<p>Give Mickey all of the triangles!</p>';
			},
			margin_vertical: '0px',
			margin_horizontal: '75px',
			mickey_audio: `${baseUrl}/quizzes/sorting-task/audio/mickey2.wav`,
			trash_audio: `${baseUrl}/quizzes/sorting-task/audio/trash.wav`
		};

		var five = {
			type: 'image-drag-response',
			stimulus: function(){
				return `${baseUrl}/quizzes/sorting-task/images/pre-test/pre-test_4.jpg`;
			},
			choices: ['MICKEY', 'TRASH'],
			button_html: [`<button class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/mickey.jpg style="width:13em;height:15em;"></button>`, `<button class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/trash.jpg style="width:9em;height:15em;"></button>`],
			prompt: function(){
				return '<p>Give Mickey all of the triangles!</p>';
			},
			margin_vertical: '0px',
			margin_horizontal: '75px',
			mickey_audio: `${baseUrl}/quizzes/sorting-task/audio/mickey2.wav`,
			trash_audio: `${baseUrl}/quizzes/sorting-task/audio/trash.wav`
		};

		var endPage = {
			type: 'ending',
			mickey_audio:`${baseUrl}/quizzes/sorting-task/audio/Mickey_GoodJob.wav`,
			pages: [
				`Thanks for helping Mickey out! Good job!
				<img id= mickeyEnding src=${baseUrl}/quizzes/sorting-task/images/mickey-mouse.jpg></img>`,
			],
		};

		var test = {

			timeline_variables: pickSeven(shuffle(
				[
					{label: 'apple',
						label2: 'apples',
						label3: 'an apple'},
					{label: 'airplane',
						label2: 'airplanes',
						label3: 'an airplane'},
					{label: 'ball',
						label2: 'balls',
						label3: 'a ball'},
					{label: 'book',
						label2: 'books',
						label3: 'a book'},
					{label: 'car',
						label2: 'cars',
						label3: 'a car'},
					{label: 'cat',
						label2: 'cats',
						label3: 'a cat'},
					{label: 'chair',
						label2: 'chairs',
						label3: 'a chair'},
					{label: 'clock',
						label2: 'clocks',
						label3: 'a clock'},
					{label: 'cookie',
						label2: 'cookies',
						label3: 'a cookie'},
					{label: 'dog',
						label2: 'dogs',
						label3: 'a dog'},
					{label: 'ear',
						label2: 'ears',
						label3: 'an ear'},
					{label: 'eye',
						label2: 'eyes',
						label3: 'an eye'},
					{label: 'flower',
						label2: 'flowers',
						label3: 'a flower'},
					{label: 'hat',
						label2: 'hats',
						label3: 'a hat'},
					{label: 'icecream',
						label2: 'ice cream',
						label3: 'ice cream'},
					{label: 'monkey',
						label2: 'monkeys',
						label3: 'a monkey'},
					{label: 'shoe',
						label2: 'shoes',
						label3: 'a shoe'},
					{label: 'sun',
						label2: 'suns',
						label3: 'a sun'},
					{label: 'telephone',
						label2: 'telephones',
						label3: 'a telephone'},
					{label: 'toothbrush',
						label2: 'toothbrushes',
						label3: 'a toothbrush'}
				]
			)),
			randomize_order: true,

			timeline: [
				{
					type: 'single-audio',
					stimulus: function(){
						var label = jsPsych.timelineVariable('label', true);
						console.log(`${baseUrl}/quizzes/sorting-task/audio/${label}.wav`);
						return `${baseUrl}/quizzes/sorting-task/audio/${label}.wav`;
					},
					timing_response: 10000,
					response_ends_trial: false,
					prompt: function(){
						//var label = jsPsych.timelineVariable('label', true);
						var label2= jsPsych.timelineVariable('label2', true);
						var label3= jsPsych.timelineVariable('label3', true);
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
								var label = jsPsych.timelineVariable('label', true);
								var picture_id = jsPsych.timelineVariable('picture_id', true);
								return `${baseUrl}/quizzes/sorting-task/images/test_trials/${label}/${label}_${picture_id}.jpg`;
							},
							choices: ['MICKEY', 'TRASH'],
							button_html: [`<button class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/mickey.jpg style="width:13em;height:15em;"></button>`, `<button class="jspsych-btn"><img src=${baseUrl}/quizzes/sorting-task/images/trash.jpg style="width:9em;height:15em;"></button>`],
							prompt: function(){
								return '<p>Give Mickey all of the '+ jsPsych.timelineVariable('label2', true)+'! </p>';
							},
							margin_vertical: '0px',
							margin_horizontal: '75px',
							mickey_audio: `${baseUrl}/quizzes/sorting-task/audio/mickey2.wav`,
							trash_audio: `${baseUrl}/quizzes/sorting-task/audio/trash.wav`
						}
					]
				}
			]
		};

		localAxios
			.get('/createUser')
			.then( res => {
				_this.setState({ loading: false, user_id: res.data.user_id });
			})
			.then(() => {
				mainTimeline.push(demographicsAge);
				mainTimeline.push(demographicsLang);
				mainTimeline.push(one);
				mainTimeline.push(two);
				mainTimeline.push(three);
				mainTimeline.push(four);
				mainTimeline.push(five);
				mainTimeline.push(test);
				mainTimeline.push(endPage);
			})
			.then(() => {
				jsPsych.init({
					display_element: this.refs.jsPsychTarget,
					timeline: mainTimeline,
					preload_audio: audio_files,
					on_data_update: function(data) {
						dataArray.push(data);
						console.log('Just added new data. The contents of the data are: '+JSON.stringify(data));
						localAxios
							.post('/metaResponse', {
								user_id: user,
								data_string: data
							})
							.then(a => { console.log(`metaResponse: ${a}`); })
							.catch(e => { console.log(`metaResponse: ${e}`); });
					}
				});
			})
			.catch(e => { console.log(`aslfdkjasldkfjlaskjfkla: ${e}`); });
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
