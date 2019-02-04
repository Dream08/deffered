const Deffered = require('./index');

function waitTimeAndCallFunction(time, callFunction) {
    setTimeout(() => { callFunction() }, time)
}

describe('Check correct creating deffered object', () => {

    describe('Check basic correct creating deffered object', () => {

        test('Deffered is created', () => {
            expect(typeof new Deffered()).toBeDefined();
        });

        test('Deffered is object', () => {
            const expectedObject = {};
            expect(new Deffered()).toMatchObject(expectedObject);
        });
    });

    describe('Check object props', () => {

        describe('isCanceled', () => {

            test('has the canceled', () => {
                let property = 'isCanceled';
                expect(new Deffered).toHaveProperty(property);
            });

            test('canceled is false', () => {
                let property = 'isCanceled';
                expect((new Deffered).isCanceled).toBeFalsy();
            });

        });

        describe('isRejected', () => {

            test('has the isRejected', () => {
                let property = 'isRejected';
                expect(new Deffered).toHaveProperty(property);
            });

            test('isRejected is false', () => {
                expect((new Deffered).isRejected).toBeFalsy();
            });

        });

        describe('isResolved', () => {

            test('has the isResolved', () => {
                let property = 'isResolved';
                expect(new Deffered).toHaveProperty(property);
            });

            test('isResolved is false', () => {
                expect((new Deffered).isResolved).toBeFalsy();
            });

        });

        describe('promise', () => {

            test('has the promise', () => {
                let property = 'promise';
                expect(new Deffered).toHaveProperty(property);
            });

            test('promise is false', () => {
                let property = {};
                expect((new Deffered).promise).toMatchObject(property);
            });

        });

    });

});

describe('Check methods', () => {

    describe('resolve', () => {

        test('with 100ms timeout', () => {
            const defferedObject = new Deffered();
            const correctData = 'Is correct work'

            waitTimeAndCallFunction(100, () => { defferedObject.resolve(correctData) });

            return expect(defferedObject).resolves.toBe(correctData);
        });

        test('change option isResolved', () => {
            const defferedObject = new Deffered();
            const correctData = 'Is correct work'

            waitTimeAndCallFunction(100, () => { defferedObject.resolve(correctData) });
            defferedObject
                .then(() => {
                    expect(defferedObject.isResolved).toBeTruthy();
                })
        });

    });

    describe('reject', () => {

        test('with 100ms timeout', () => {
            const defferedObject = new Deffered();
            const correctData = 'error with 100ms timeout';

            waitTimeAndCallFunction(100, () => { defferedObject.reject(correctData) });

            return defferedObject.promise.catch(e => expect(e).toMatch(correctData));
        });

        test('change isRejected option', () => {
            const defferedObject = new Deffered();
            const correctData = 'error change isRejected option';

            defferedObject.reject(correctData);

            return defferedObject.promise
                .catch(e => expect(defferedObject.isRejected).toBeTruthy())


        });

    });

    describe('then', () => {

        test('with 100ms timeout', () => {
            const defferedObject = new Deffered();
            const correctData = 'Is correct work'

            waitTimeAndCallFunction(100, () => { defferedObject.resolve(correctData) });

            defferedObject
                .then(data => {
                    expect(data).toEqual(correctData);
                })
        });

        test('with 100ms timeout', () => {
            const defferedObject = new Deffered();
            const correctData = 'Is correct work'

            waitTimeAndCallFunction(100, () => { defferedObject.resolve(correctData) });

            defferedObject
                .then(data => {
                    expect(data).toEqual(correctData);
                })
        });

    });

    describe('cancel', () => {

        test('simple stop work', () => {
            const defferedObject = new Deffered();
            const correctData = 'Is cancel correct work';

            defferedObject.promise
                .then(() => { })
                .catch(() => { })

            expect(defferedObject.cancel(correctData)).toBeTruthy();
        });

        test('stop work after resolve', () => {
            const defferedObject = new Deffered();
            const correctData = 'Is cancel correct work';



            defferedObject.resolve(correctData);

            expect(defferedObject.cancel(correctData)).toBeFalsy();
        });

        test('stop work after reject', () => {
            const defferedObject = new Deffered();
            const correctData = 'Is cancel correct work';

            defferedObject.promise
                .then(() => { })
                .catch(() => { })

            defferedObject.reject(correctData);


            expect(defferedObject.cancel(correctData)).toBeFalsy();
        });

        test('trigger catch after stop', () => {
            const defferedObject = new Deffered();
            const correctData = 'Is cancel correct work';
            const promise = defferedObject.promise;

            defferedObject.cancel(correctData);

            promise
                .then(() => { })
                .catch(() => { })

            expect(defferedObject.cancel(correctData)).toBeFalsy();
        });


    });

    describe('promise in second level', () => {

        test('with 100ms timeout', () => {
            const defferedObject = new Deffered();
            const correctData = 'Is cancel correct work';
            const promise = defferedObject.promise;

            waitTimeAndCallFunction(100, () => { promise.resolve(correctData) });

            promise
                .then(data => {
                    expect(data).toEqual(correctData);
                })
        });

        test('check resolve if use resolve in deffered function', () => {
            const defferedObject = new Deffered();
            const correctData = 'Is cancel correct work';
            const promise = defferedObject.promise;

            waitTimeAndCallFunction(100, () => { defferedObject.resolve(correctData) });

            promise
                .then(data => { expect(data).toEqual(correctData) })
        });

        test('check catch if use reject in deffered function', () => {
            const defferedObject = new Deffered();
            const correctData = 'error';
            const promise = defferedObject.promise;

            waitTimeAndCallFunction(100, () => { defferedObject.reject(error) });

            promise
                .catch(e => expect(e).toMatch(correctData));
        });

        test('check catch if use cancel in deffered function', () => {
            const defferedObject = new Deffered();
            const correctData = 'error';
            const promise = defferedObject.promise;

            waitTimeAndCallFunction(100, () => { defferedObject.cancel(error) });

            promise
                .catch(e => expect(e).toMatch(correctData));
        });

    });

});