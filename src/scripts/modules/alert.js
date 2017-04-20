/* Simple audio player */
import audio_file from '../../audio/default.mp3';

class Alert {

    constructor() {
        this.alert = new Audio(audio_file);

        this.alert.addEventListener('ended', () => {
            this.alert.currentTime = 0;
            this.play();
        }, false);

    }

    play() {
        this.alert.play();
    }

    pause() {
        this.alert.pause();
    }

}
export default Alert;