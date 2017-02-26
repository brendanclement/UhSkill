'use strict';
import * as Alexa from 'alexa-sdk';
import { DefaultHandler } from './handler';

const states = {
    STARTSTATE : '_START'
}

export function handler(event, context, callback) {
    let alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = 'WordBlanks';
    alexa.registerHandlers(new DefaultHandler().handler());
    alexa.execute();
}