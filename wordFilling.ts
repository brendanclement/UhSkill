'use strict';
import { IBlankGrabber, BlankGrabber } from './blankGrabber'; 

export class WordFillingHandler {

    constructor(private blankGrabber : IBlankGrabber = new BlankGrabber()) {
    }

    public handler() {
        console.log('word filling handler func called');
        const self = this;
        return {
            'ProvideWordIntent' : function() {
                const wordSlot = this.event.request.intent.slots.word;
                if(!(wordSlot && wordSlot.value)) {
                    this.emitWithState('Unhandled');
                    return;
                }
                
                self.blankGrabber.fillBlank(this.attributes.blanks, wordSlot.value);
                console.log(`blanks is ${JSON.stringify(this.attributes.blanks)}`);                
                let blank = self.blankGrabber.getNextBlank(this.attributes.blanks);
                console.log(`blanks is ${JSON.stringify(blank)}`);     
                //TODO: Check if they are all filled out
                if(blank == undefined) {
                    let story = self.blankGrabber.replaceInStory(this.attributes.blanks, this.attributes.story);
                    this.emit(':tell', `OK heres the story. ${story}`);
                    return;
                }
                this.emit(':ask', `Great! Could you give me a ${blank.spoken_name} ?`);
            },
            'Unhandled' : function() {
                this.emit(':ask', "Sorry, I didn't understand that, try saying it again.")
            }
        }
    }
}