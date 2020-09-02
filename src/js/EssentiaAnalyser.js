class EssentiaAnalyser {
    constructor(audioContext){
        this.audioContext = audioContext;
    	// this.track = track;
        this.essentia = null;
        this.essentiaCustom = null;
        this.essentiaSaturationExtractor = null;
		this.startStopSilenceExtractor = null
        this.frameSize = 512;
        this.hopSize = 256;
        // this.bufferSize = 8192;
        // this.scriptNode = audioContext.createScriptProcessor(this.bufferSize, 1, 1);

        // this.analyser.fftSize = 2048;
        // this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
        // this.analyser.getByteFrequencyData(this.freqData);
        // this.bins = this.analyser.frequencyBinCount;
        this.init();
    }

    init(){
    	EssentiaModule().then( (EssentiaWasmModule)=> {
			this.essentia = new Essentia(EssentiaWasmModule);
    	});

		EssentiaWASMSaturation().then( (EssentiaWasmModule)=> {
			this.essentiaSaturationExtractor = new EssentiaWasmModule.SaturationDetectorExtractor(this.frameSize, this.hopSize);
		});

		EssentiaWASMStartStopSilence().then( (EssentiaWasmModule) =>{
			this.startStopSilenceExtractor = new EssentiaWasmModule.StartStopSilenceExtractor(this.frameSize, this.hopSize);
		});



	}

	qualityAnalysis(trackBuffer) {
		const FRAME_SIZE = 512;
		const HOP_SIZE = 256;
		let saturationResults = {'starts': null, 'ends': null};
		let startStopCutResults = { 'startCut': 0, 'stopCut': 0 };
		let snrResults = [];
		let startStopSilenceResults = 0;
		// let humResults = [];
		// let falseStereoResults = [];
		// let truePeakDetectorResults;
		// let discontinuityResults = [];
		// let clickDetectorResults = [];
		// let gapsDetectorResults = [];
		// let noiseBurstDetectorResults = [];


		let trackBufferData = this.essentia.arrayToVector(trackBuffer.getChannelData(0));

		//StartStopSilence
		startStopSilenceResults = this.startStopSilenceExtractor.compute(trackBuffer.getChannelData(0));
		//startStopSilenceResults['startFrame'] = this.startStopSilenceExtractor.computeStartframe(trackBuffer.getChannelData(0));
		//startStopSilenceResults['stopFrame'] = this.startStopSilenceExtractor.computeStopframe(trackBuffer.getChannelData(0));

		//Saturation
		saturationResults['starts'] = this.essentiaSaturationExtractor.computeStarts(trackBuffer.getChannelData(0));
		saturationResults['ends'] = this.essentiaSaturationExtractor.computeEnds(trackBuffer.getChannelData(0));

		//StartStopCut
		startStopCutResults = this.essentia.StartStopCut(trackBufferData);



		//const frames = this.essentia.FrameGenerator(trackBuffer.getChannelData(0), FRAME_SIZE, HOP_SIZE);
		//for (let i = 0; i < frames.size(); i++) {
		//	let frame_windowed = this.essentia.Windowing(frames.get(i), true, FRAME_SIZE);
			// SNR
		//	snrResults.push(this.essentia.SNR(frame_windowed['frame']));

			//Clicks
			// let clickRes = this.essentia.ClickDetector(frames.get(i));
			// if (clickRes["starts"].size() !== 0){
			// 	clickDetectorResults.push(clickRes);
			// }
			//Discontinuity
			// let discRes = this.essentia.DiscontinuityDetector(frames.get(i));
			// if (discRes["discontinuityLocations"].size() !== 0){
			// 	discRes["frame"]=i;
			// 	discontinuityResults.push(discRes);
			// }
		//}


		console.log("startStopCutResults");
		console.log(startStopCutResults);
		console.log("saturationResults");
		console.log(saturationResults);
		console.log("startStopSilenceResults");
		console.log(startStopSilenceResults);





		// console.log("snrResults: " + snrResults[0].instantSNR.get(0));
		// console.log("snrResults: " + this.essentia.vectorToArray(snrResults[0]));
		// for(let i = 0; i < clickDetectorResults.length; i++){
		// 	console.log("clickDetector: " + clickDetectorResults[i]["starts"].get(0));
		// }
		// for(let i = 0; i < saturationDetectorResults.length; i++){
		// 	console.log("saturationDetector: " + saturationDetectorResults[i]["starts"].get(0));
		// 	console.log(saturationDetectorResults[i]["starts"]);
		// }
		// for(let i = 0; i < discontinuityResults.length; i++){
		// 	console.log("discontinuityLocations: " + discontinuityResults[i]["discontinuityLocations"].get(0));
		// 	console.log("discontinuityAmplitudes: " + discontinuityResults[i]["discontinuityAmplitudes"].get(0));
		// 	console.log("frame: " + discontinuityResults[i]["frame"]);
		// }


		return {
		 	"startStopSilenceResults": startStopSilenceResults,
		// 	"clickDetectorResults": clickDetectorResults,
		 	"startStopCutResults": startStopCutResults,
			"saturationResults": saturationResults
		}
	}
}





// STEREO

//LoudnessEBUR128
//Input VectorVectorFloat


//FalseStereoDetector
//Input VectorVectorFloat


// SIGNAL

//StartStopCut - OK

// HumDetector
// let humResults = this.essentia.HumDetector(this.essentia.arrayToVector(trackBuffer.getChannelData(0)));
// Compilation Error


//TruePeakDetector
// truePeakDetectorResults = this.essentia.TruePeakDetector(trackBufferData);
// essentia-wasm.web.js:27 Compiled code throwing an exception, 10071176,27820,440


// FRAMES

// GapsDetector
// gapsDetectorResults.push(this.essentia.GapsDetector(frames.get(i)));
// essentia-wasm.web.js:27 Compiled code throwing an exception, 6083720,27820,440


// StartStopSilence
// startStopSilenceResults.push(this.essentia.StartStopSilence(frames.get(i)));
// Lack of internal memory. Doesn't work in js


// SaturationDetector
// saturationDetectorResults.push(this.essentia.SaturationDetector(frames.get(i)));
// Uncaught Empty vector input
// {starts: 'starting times of the detected saturated regions [s]', ends: 'ending times of the detected saturated regions [s]'}


// DiscontinuityDetector
// discontinuityResults.push(this.essentia.DiscontinuityDetector(frames.get(i)));
// Uncaught Empty vector input
// {discontinuityLocations: 'the index of the detected discontinuities (if any)',
// discontinuityAmplitudes: 'the peak values of the prediction error for the discontinuities (if any)'}


// ClickDetector
// clickDetectorResults.push(this.essentia.ClickDetector(frames.get(i)));
// console.log(this.essentia.vectorToArray(this.essentia.ClickDetector(frames.get(i))['starts']));
// Uncaught Empty vector input
// {starts: 'starting indexes of the clicks', ends: 'ending indexes of the clicks'}


// NoiseBurstDetector
// noiseBurstDetectorResults.push(this.essentia.NoiseBurstDetector(frames.get(i)));
// Uncaught Empty vector input
// {indexes: 'indexes of the noisy samples'}


//SNR
// snrResults.push(this.essentia.SNR(frame_windowed['frame']));
// Uncaught Empty vector input
// {instantSNR: -69.27735137939453, averagedSNR: -Infinity, spectralSNR: VectorFloat}