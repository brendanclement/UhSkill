'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { states } from './index';

export class DefaultHandler {

    public handler() {
        const self = this;
        return {
            'NewSession' : function() {
               // let story = fs.readFileSync(path.join(__dirname, 'stories', 'school_story', 'school_story_filled.txt'), { encoding: 'utf8'});
                this.handler.state = states.CONFIRM_NEW_GAME;
                this.emit(':ask', 'Welcome to Word blanks, would you like to start a new game?');
            },

            'SessionEndedRequest' : function() {
                
            },

            'Unhandled' : function() {

            }
        }
    }
}