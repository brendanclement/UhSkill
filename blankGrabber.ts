'use strict';

import { IBlank } from './storyParser';

export interface IBlankGrabber {
    getNextBlank(blanks : IBlank[]) : IBlank;
    fillBlank(blanks : IBlank[], value : string) : void;
    replaceInStory(blanks : IBlank[], story : string) : string;
}

export class BlankGrabber {
    getNextBlank(blanks : IBlank[]) {
        return blanks.find((blank) => {
            return blank.value === '___TO_BE_FILLED___'
        });
    }

    fillBlank(blanks : IBlank[], value : string) {
        let val = this.getNextBlank(blanks);
        val.value = value;
    }

    replaceInStory(blanks : IBlank[], story : string) : string {
        blanks.forEach((blank) => {
            story = story.replace(blank.var_name, blank.value);
        });
        return story;
    }
}