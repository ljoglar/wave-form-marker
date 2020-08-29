class Controls {
    constructor() {
        this.playButton = null;
        this.stopButton = null;
        this.loopButton = null;
        this.analyserButton = null;
        this.qualityButton = null;
        this.uploadTrackButton = null;

        this._createPlayControl();
        this._createStopControl();
        this._createLoopControl();
        this._createAnalyserControl();
        this._createQualityControl();
        this._createUploadTrackControl();
    }
    _createPlayControl() {
        this.playButton = document.createElement("BUTTON");
        this.playButton.className = "btn-lg btn-success";
        this.playButton.innerHTML = `<span><i class="fa fa-play"></i></span>`;
    }
    _createStopControl() {
        this.stopButton = document.createElement("BUTTON");
        this.stopButton.className = 'btn-lg btn-danger';
        this.stopButton.innerHTML = `<span><i class="fa fa-stop"></i></span>`;
    }
    _createLoopControl() {
       this.loopButton = document.createElement("BUTTON");
       this.loopButton.className = 'btn-lg btn-default';
       this.loopButton.dataset.looping = 'false';
       this.loopButton.innerHTML = `<span><i class="fa fa-recycle"></i></span>`;
    }

    _createAnalyserControl() {
        /**
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
            Open modal
        </button>
         */
        this.analyserButton = document.createElement("BUTTON");
        this.analyserButton.className = 'btn-lg btn-default';
        this.analyserButton.dataset.toggle = 'modal';
        this.analyserButton.dataset.target = '#myModal';
        this.analyserButton.innerHTML = `<span><i class="fa fa-chart-bar"></i>Analyser</span>`;
    }

    _createQualityControl(){
        this.qualityButton = document.createElement("BUTTON");
        this.qualityButton.className = 'btn-lg btn-default';
        this.qualityButton.innerHTML = `<span><i class="fa fa-heartbeat"></i></span>`;
    }

    _createUploadTrackControl(){
        this.uploadTrackButton = document.createElement("BUTTON");
        this.uploadTrackButton.className = 'btn-lg btn-default';
        this.uploadTrackButton.innerHTML = `<input type="file" id="uploadFile"><span><i class="fa fa-upload"></i></span></input>`;
    }

    getPlayElement() {
        return this.playButton;
    }

    getStopElement() {
        return this.stopButton;
    }

    getLoopElement() {
        return this.loopButton;
    }

    getQualityElement() {
        return this.qualityButton;
    }

    getUploadTrackElement(){
        return this.uploadTrackButton;
    }

    render() {
        let container = document.createElement('div');
        container.className = 'container text-center pt-4';

        container.appendChild(this.playButton);
        container.appendChild(this.stopButton);
        container.appendChild(this.loopButton);
        //container.appendChild(this.analyserButton);
        container.appendChild(this.qualityButton);
        container.appendChild(this.uploadTrackButton);

        document.body.appendChild(container);
     }



}