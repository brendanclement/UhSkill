import * as fs from 'fs';
import * as path from 'path';

export class DefaultHandler {

    public handler() {
        const self = this;
        return {
            'NewSession' : function() {
                let story = fs.readFileSync(path.join(__dirname, 'stories', 'school_story', 'school_story_filled.txt'), { encoding: 'utf8'});
                this.emit(':tell', story);
            },

            'SessionEndedRequest' : function() {
                
            },

            'Unhandled' : function() {

            }
        }
    }
}