export class DefaultHandler {

    public handler() {
        const self = this;
        return {
            'NewSession' : function() {
                this.emit(':tell', 'hello welcome to word blanks');
            },

            'SessionEndedRequest' : function() {

            },

            'Unhandled' : function() {

            }
        }
    }
}