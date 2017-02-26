'use strict';
import * as Alexa from 'alexa-sdk';
import { DefaultHandler } from './handler';
import { ConfirmNewGameHandler } from './confirmNewGame';
import { WordFillingHandler } from './wordFilling';

export const states = {
    CONFIRM_NEW_GAME : 'CONFIRM_NEW_GAME',
    WORD_FILLING : 'WORD_FILLING'
}

export function handler(event, context, callback) {
    let alexa = Alexa.handler(event, context);
    console.log(`event was ${JSON.stringify(event)}`);
    alexa.dynamoDBTableName = 'WordBlanks';
    alexa.registerHandlers(new DefaultHandler().handler(),
        Alexa.CreateStateHandler(states.CONFIRM_NEW_GAME, (new ConfirmNewGameHandler().handler())),
        Alexa.CreateStateHandler(states.WORD_FILLING, (new WordFillingHandler().handler()))
    );
    alexa.execute();
}