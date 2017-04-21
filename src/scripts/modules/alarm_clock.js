
import Padder from './padder';
import Alert from './alert';

class AlarmClock {

    constructor() {

        this.interval = 1000;
        this.initDomElements();
        this.addListeners();
        this.initMessages();
        this.initAlarm();
        this.setAlarmStatusMessage();

    }

    initDomElements() {
        
        /* Looks up all the elements to be used and register thems to the class */
        this.clock = document.querySelector("#clock");
        this.alarm_status_message = document.querySelector("#alarm_status_message");
        this.display_alarm_form = document.querySelector("#display_alarm_form");
        this.stop_alarm = document.querySelector("#stop_alarm");
        this.alarm_form_area = document.querySelector("#alarm_form_area");
        this.alarm_hour = this.alarm_form_area.querySelector("#alarm_hour");
        this.alarm_minutes = this.alarm_form_area.querySelector("#alarm_minutes");
        this.alarm_form = this.alarm_form_area.querySelector("#alarm_form");
        this.set_alarm = this.alarm_form_area.querySelector("#set_alarm");
        this.unset_alarm = this.alarm_form_area.querySelector("#unset_alarm");
        this.close_form = this.alarm_form_area.querySelector("#close_form");

    }

    initMessages() {
        
        /* Init all messages to be  display on the status */
        this.messages = {
            alarm_not_set: "Alarm is not set",
            alarm_set: "Alarm is set to"
        }

    }

    initAlarm() {
        
        /* Init/Reset alarm variables */
        this.alarm_is_set = false;
        this.alarm_is_playing = false;
        this.alarm = {};
        this.alarm_form.reset();
        this.alert = new Alert();
    }


    addListeners() {
        
        /* Add listener events to form elements */
        this.alarm_form.addEventListener("submit", (e) => {
            this.handleSetAlarm(e);
        }, false);

        this.unset_alarm.addEventListener("click", (e) => {
            this.handleUnSetAlarm(e);
        }, false);

        this.display_alarm_form.addEventListener("click", (e) => {
            this.toggleDisplayAlarmForm(e);
        }, false);

        this.stop_alarm.addEventListener("click", (e) => {
            this.stopAlarm(e);
        }, false);

        this.close_form.addEventListener("click", (e) => {
            this.toggleDisplayAlarmForm(e);
        }, false);

    }

    setAlarmStatusMessage() {
        
        /* Change the alarm message */
        if (this.alarm_is_set) {
            this.alarm_status_message.innerHTML = `${this.messages.alarm_set} ${this.alarm.hour}:${Padder(this.alarm.minutes)}`;
        } else if (!this.alarm_is_set) {
            this.alarm_status_message.innerHTML = this.messages.alarm_not_set;
        }

    }

    getAlarm() {
       
        /* Gets the alarm_is_set status */
        return this.alarm_is_set;
    
    }
    
    addBlink() {

        this.clock.classList.add("blink");
    }

    removeBlink() {

        this.clock.classList.remove("blink");
    }

    toggleDisplayAlarmForm(e) {
      
        e.preventDefault();
        this.showHideForm();
    
    }

    handleSetAlarm(e) {
        
        /* Handles submit of the alarm */
        e.preventDefault();
        this.setAlarm();
    }

    handleUnSetAlarm(e) {
        
        /* Handles submit of the alarm */
        e.preventDefault();
        this.unsetAlarm();
    }

    showHideForm() {

        this.alarm_form_area.style.display = this.alarm_form_area.style.display == "none" || this.alarm_form_area.style.display == "" ? "block" : "none";

    }

    setAlarm() {
       
        /* Sets up the alarm object containing the time when the alarm will go off */
        if (this.alarm_hour.value && this.alarm_minutes.value) {
            
            this.alarm = {
                hour: this.alarm_hour.value,
                minutes: this.alarm_minutes.value
            };

            this.alarm_is_set = true;
            this.setAlarmStatusMessage();
            this.showHideForm();
        }

    }

    unsetAlarm() {

        this.alarm_is_set = false;
        this.resetAlarmForm();
        this.setAlarmStatusMessage();

    }

    resetAlarmForm() {

        this.alarm_form.reset();

    }

    startAlarm() {

        this.addBlink();
        this.alert.play();
        this.alarm_is_playing = true;
        this.showStop();

    }

    stopAlarm() {

        this.removeBlink();
        this.alert.pause();
        this.hideStop();

    }

    showStop() {

        this.stop_alarm.style.display = "inline";

    }

    hideStop() {

        this.stop_alarm.style.display = "none";

    }

    checkTime(hour, minutes) {

        /* Checks for time of alarm */
        if (!this.alarm_is_set || Object.keys(this.alarm).length === 0) {
            return false;
        }
        if (hour == this.alarm.hour && minutes == this.alarm.minutes && this.alarm_is_playing === false) {


            this.startAlarm();
            this.alarm_is_playing = true;
        }

    }

    renderClock() {

         
        setInterval(() => {

            let time = new Date();

            let hour = time.getHours();
            let min = time.getMinutes();
            let sec = time.getSeconds();

            this.clock.innerHTML = Padder(hour) + ":" + Padder(min) + ":" + Padder(sec);

            this.checkTime(hour, min);

        }, this.interval);
    }

}

export default AlarmClock;