class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = JSON.stringify(config);
        this.state = JSON.parse(this.config).initial;
        this.history = [this.state];
        this.histChange = [];
        this.trigg = false;
        this.chSt = false;
        /*if (isNaN(this.config)) {
            throw new Error("Smth goes wrong");
        }*/
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        let states = JSON.parse(this.config).states;
            if(states[state] !== undefined){
                this.state = state; 
                this.history.push(this.state);
                this.chSt = true;
            }
            else
                 throw new Error("Smth goes wrong");   
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        var k = this.state;
        for(var a in JSON.parse(this.config)){
            if(JSON.parse(this.config)[a] instanceof Object){
                for(var b in JSON.parse(this.config)[a]){
                    if(JSON.parse(this.config)[a][b] instanceof Object){
                        for(var c in JSON.parse(this.config)[a][b]){
                            if(JSON.parse(this.config)[a][b][c] instanceof Object){
                                for(var d in JSON.parse(this.config)[a][b][c]){
                                    if(d === event){
                                        this.state = JSON.parse(this.config)[a][b][c][d];
                                        this.history.push(this.state);
                                        this.trigg = true;
                                        break;
                                    }
                                    break;
                                    
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = JSON.parse(this.config).initial;
        this.history.push(this.state);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
        let k=0;
        if(event == undefined){
            for(var a in JSON.parse(this.config)){
            if(JSON.parse(this.config)[a] instanceof Object){
                for(var b in JSON.parse(this.config)[a]){
                    arr.push(b);
                }
            }
        }
        }
        for(var a in JSON.parse(this.config)){
            if(JSON.parse(this.config)[a] instanceof Object){
                for(var b in JSON.parse(this.config)[a]){
                    var tr = JSON.parse(this.config)[a][b].transitions;
                    if(tr[event] != undefined){
                        arr.push(b);
                    }
                }
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.history.length>1){
            this.histChange.push(this.history.pop());
            this.state = this.history.pop();
            this.history.push(this.state);
            this.trigg = false;
            this.chSt = false;
            return true;
        }
        else
            return false;
        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        
        if(this.histChange.length == 0 || this.trigg || this.chSt)
            return false;
        else
        {
            this.state=this.histChange.pop();
        return true;
        }
       
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = JSON.parse(this.config).initial;
        this.histChange.length = 0;
        this.history.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
