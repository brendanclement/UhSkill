'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { states } from './index';
import { StoryParser, IStoryParser } from './storyParser';
import { IBlankGrabber, BlankGrabber } from './blankGrabber';

export class ConfirmNewGameHandler {

    constructor(
        private storyParser : IStoryParser = new StoryParser(),
        private blankGrabber : IBlankGrabber = new BlankGrabber()
    ) {
    }

    public handler() {
        const self = this;
        return {
            'AMAZON.YesIntent' : function() {
                this.attributes.story = fs.readFileSync(path.join(__dirname, 'stories', 'school_story', 'school_story.txt'), { encoding: 'utf8'});
                console.log(this.attributes.story);
                this.attributes.blanks = self.storyParser.getBlanks(this.attributes.story);
                console.log(`blanks is ${JSON.stringify(this.attributes.blanks)}`);                
                let blank = self.blankGrabber.getNextBlank(this.attributes.blanks);
                console.log(`blanks is ${JSON.stringify(blank)}`);     
                //TODO: Check if they are all filled out
                this.handler.state = states.WORD_FILLING;
                this.emit(':ask', `Great! Could you give me a ${blank.spoken_name} ?`);
            },
            'AMAZON.NoIntent' : function() {
                this.handler.state = '';
                this.emit(':tell', 'OK, have a nice day');
            },
            'Unhandled' : function() {
                this.emit(':ask', 'Sorry, I didn\'t get that, please say yes or no');
            }
        }
    }
}