'use strict';

export interface IStoryParser {
    getBlanks(story : string) : IBlank[];
}

export interface IBlank {
    spoken_name : string,
    var_name : string,
    value : string
}

export class StoryParser {
    private static re = /({\w+})/g;

    getBlanks(story : string) : IBlank[] {
        let result : IBlank[] = [];
        let m;
        do {
            m = StoryParser.re.exec(story);
            if (m) {
                result.push({
                    spoken_name : this.cleanValue(m[1]),
                    var_name: m[1],
                    value : '___TO_BE_FILLED___'
                });
            }
        } while (m);
        return result;
    }

    private cleanValue(input : string) {
        return input.replace(/[{}]/g, '').replace(/_\d/g, '').replace('_', ' ');
    }
}