'use strict';

class DefferedError extends Error {

    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, DefferedError)
    }

}

const privateProperties = {
    resolve: null,
    reject: null
};

class Deffered {

    constructor() {

        this.isCanceled = false;
        this.isRejected = false;
        this.isResolved = false;

        this.promise = new Promise((res, rej) => {
            privateProperties.resolve = res;
            privateProperties.reject = rej;
        })
    }

    /**
     * Cancel deffered object wait
     * @param {string} reason - Reason for cancel and error
    */
    cancel(reason) {
        if (this.isRejected || this.isResolved) {
            return false;
        } 
        const error = new DefferedError(reason);
        this.reject(error);
        return true;
    }

    /**
     * Action after action
     * @param {Array} args - Args for action
    */
    then(...args) {
        return this.promise.then(...args);
    }

    /**
     * Triggered reject event
     * @param {string} reason - Args for reject event
    */
    reject(...args) {
        this.isRejected = true;
        return privateProperties.reject(...args);
    }

    /**
     * Triggered resolve event
     * @param {string} reason - Args for resolve event
    */
    resolve(...args) {
        this.isResolved = true;
        return privateProperties.resolve(...args);
    }

    /**
     * Get object callback
     * @param {string} reason - Reason for cancel and error
    */
    callback() {
        return this;
    }
    
}

module.exports = Deffered;