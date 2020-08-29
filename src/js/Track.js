class Track {
    constructor(){
       this.buffer = null;
       this.audioURL = null;
    }

    setAudioURL(url){
        this.audioURL = url;
    }

    /**
     * 
     * @param {*} buffer 
     */
    addBuffer(buffer) {
            this.buffer = buffer;
    }

    load(player) {
        if(this.audioURL === null){
            return;
        }
        this.loadFile(player, this.audioURL).then((audioBuffer) => {
           this.addBuffer(audioBuffer);
           requestAnimationFrame(player.draw.bind(player));
        });
    }

    async getFile(player, filepath) {
        const response = await fetch(filepath);
        const arrayBuffer = await response.arrayBuffer();
        return await player.audioContext.decodeAudioData(arrayBuffer);
      }
    
    async loadFile(player, filePath) {
        return await this.getFile(player, filePath);
      }
    render() {

    }
    
}
